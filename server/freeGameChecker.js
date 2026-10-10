import { fetch as undiciFetch } from 'undici';

/**
 * Free Live In-Game Account & Nickname Checker
 * Queries multiple free game gateways to verify real player existence & nickname
 * 100% Free - No paid API keys required
 */
export async function checkFreeGameNickname(gameId, userId, zoneId, server) {
  const cleanId = String(userId).trim();
  const cleanZone = String(zoneId || server || '').trim();

  if (!cleanId) return null;

  // 1. Mobile Legends: Bang Bang
  if (gameId === 'mobile-legends') {
    if (!cleanZone) return null;

    // Provider A: mlbb-api.isan.eu.org/find
    try {
      const res = await undiciFetch(`https://mlbb-api.isan.eu.org/find?id=${encodeURIComponent(cleanId)}&zone=${encodeURIComponent(cleanZone)}`, {
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.name) {
          return {
            success: true,
            isReal: true,
            nickname: String(data.name).trim(),
            userId: cleanId,
            zoneId: cleanZone,
            country: data.countryName || 'Global',
          };
        }
      } else if (res.status === 404) {
        return {
          success: false,
          isReal: false,
          invalidId: true,
          error: 'រកមិនឃើញគណនី MLBB នេះទេ (Invalid User ID or Zone ID)',
        };
      }
    } catch (e) {
      console.warn('[MLBB isan find error]', e.message);
    }

    // Provider B: api.isan.eu.org/nickname/ml
    try {
      const res = await undiciFetch(`https://api.isan.eu.org/nickname/ml?id=${encodeURIComponent(cleanId)}&server=${encodeURIComponent(cleanZone)}`, {
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.name) {
          return {
            success: true,
            isReal: true,
            nickname: String(data.name).trim(),
            userId: cleanId,
            zoneId: cleanZone,
            country: data.country || 'Global',
          };
        }
      }
    } catch (e) {
      console.warn('[MLBB isan nick error]', e.message);
    }
  }

  // 2. Free Fire
  if (gameId === 'free-fire') {
    // Provider A: Gopay Games API (Direct Indonesia/Global SEA cluster)
    try {
      const res = await undiciFetch(`https://gopay.co.id/games/v1/order/prepare/FREEFIRE?userId=${encodeURIComponent(cleanId)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0',
        },
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.data && typeof data.data === 'string' && data.data.trim()) {
          return {
            success: true,
            isReal: true,
            nickname: data.data.trim(),
            userId: cleanId,
          };
        }
      }
    } catch (e) {
      console.warn('[Free Fire Gopay error]', e.message);
    }

    // Provider B: isan API (Only if name exists)
    try {
      const res = await undiciFetch(`https://api.isan.eu.org/nickname/ff?id=${encodeURIComponent(cleanId)}`, {
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.name && String(data.name).trim()) {
          return {
            success: true,
            isReal: true,
            nickname: String(data.name).trim(),
            userId: cleanId,
          };
        }
      }
    } catch (e) {
      console.warn('[Free Fire isan error]', e.message);
    }

    // Provider C: Codashop SG
    try {
      const body = `voucherPricePoint.id=8050&voucherPricePoint.price=1000.0&voucherPricePoint.variablePrice=0&user.userId=${encodeURIComponent(cleanId)}&voucherTypeName=FREEFIRE&shopLang=en_US&voucherTypeId=1&gvtId=1`;
      const res = await undiciFetch('https://order-sg.codashop.com/initPayment.action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Origin': 'https://www.codashop.com',
          'Referer': 'https://www.codashop.com/',
        },
        body,
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.confirmationFields?.username) {
          const rawName = data.confirmationFields.username;
          const decoded = decodeURIComponent(rawName.replace(/\+/g, '%20'));
          return {
            success: true,
            isReal: true,
            nickname: decoded,
            userId: cleanId,
          };
        }
        // If Codashop explicitly says Wrong player id (errorCode 12)
        if (data.errorCode === 12 || (data.errorMsg && data.errorMsg.toLowerCase().includes('wrong player id'))) {
          return {
            success: false,
            isReal: false,
            invalidId: true,
            error: 'រកមិនឃើញគណនី Free Fire នេះទេ (Wrong Player ID) សូមពិនិត្យមើលលេខ UID ឡើងវិញ',
          };
        }
        // If Codashop returns errorCode 24 (Topup region blocked for player) -> verified player exists
        if (data.errorCode === 24 || (data.errorMsg && data.errorMsg.toLowerCase().includes('region blocked'))) {
          return {
            success: true,
            isReal: true,
            accountExists: true,
            nickname: null,
            userId: cleanId,
          };
        }
      }
    } catch (e) {
      console.warn('[Free Fire Codashop error]', e.message);
    }
  }

  // 3. Genshin Impact & Valorant
  if (gameId === 'genshin-impact' || gameId === 'valorant') {
    let body = '';
    if (gameId === 'genshin-impact') {
      let giZone = 'os_asia';
      if (cleanId.startsWith('6')) giZone = 'os_usa';
      else if (cleanId.startsWith('7')) giZone = 'os_euro';
      else if (cleanId.startsWith('8')) giZone = 'os_asia';
      else if (cleanId.startsWith('9')) giZone = 'os_cht';
      body = `voucherPricePoint.id=116054&voucherPricePoint.price=16500.0&voucherPricePoint.variablePrice=0&user.userId=${encodeURIComponent(cleanId)}&user.zoneId=${giZone}&voucherTypeName=GENSHIN_IMPACT&shopLang=en_US`;
    } else {
      body = `voucherPricePoint.id=973634&voucherPricePoint.price=56000.0&voucherPricePoint.variablePrice=0&user.userId=${encodeURIComponent(cleanId)}&voucherTypeName=VALORANT&voucherTypeId=109&gvtId=139&shopLang=en_US`;
    }

    try {
      const res = await undiciFetch('https://order-sg.codashop.com/initPayment.action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Origin': 'https://www.codashop.com',
          'Referer': 'https://www.codashop.com/',
        },
        body,
        signal: AbortSignal.timeout(4500),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.confirmationFields?.username) {
          const rawName = data.confirmationFields.username;
          const decoded = decodeURIComponent(rawName.replace(/\+/g, '%20'));
          return {
            success: true,
            isReal: true,
            nickname: decoded,
            userId: cleanId,
            zoneId: cleanZone || null,
            server: server || null,
          };
        }
        if (data.errorCode === -100 || (data.errorMsg && data.errorMsg.toLowerCase().includes('invalid user id'))) {
          return {
            success: false,
            isReal: false,
            invalidId: true,
            error: 'រកមិនឃើញគណនីហ្គេមនេះទេ (Invalid In-Game User ID)',
          };
        }
      }
    } catch (e) {
      console.warn('[Codashop GI/VALO error]', e.message);
    }
  }

  return null;
}
