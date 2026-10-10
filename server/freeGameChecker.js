import { fetch as undiciFetch } from 'undici';

/**
 * Free Live In-Game Account & Nickname Checker
 * Queries official game gateway to verify real player existence & nickname
 * 100% Free - No paid API keys required
 */
export async function checkFreeGameNickname(gameId, userId, zoneId, server) {
  const endpoint = 'https://order-sg.codashop.com/initPayment.action';
  const cleanId = String(userId).trim();
  const cleanZone = String(zoneId || server || '').trim();

  if (!cleanId) return null;

  let body = '';
  switch (gameId) {
    case 'mobile-legends':
      if (!cleanZone) return null;
      body = `voucherPricePoint.id=4150&voucherPricePoint.price=1579.0&voucherPricePoint.variablePrice=0&user.userId=${encodeURIComponent(cleanId)}&user.zoneId=${encodeURIComponent(cleanZone)}&voucherTypeName=MOBILE_LEGENDS&shopLang=en_US&voucherTypeId=1&gvtId=1`;
      break;

    case 'free-fire':
      body = `voucherPricePoint.id=8050&voucherPricePoint.price=1000.0&voucherPricePoint.variablePrice=0&user.userId=${encodeURIComponent(cleanId)}&voucherTypeName=FREEFIRE&shopLang=en_US&voucherTypeId=1&gvtId=1`;
      break;

    case 'genshin-impact': {
      let giZone = 'os_asia';
      if (cleanId.startsWith('6')) giZone = 'os_usa';
      else if (cleanId.startsWith('7')) giZone = 'os_euro';
      else if (cleanId.startsWith('8')) giZone = 'os_asia';
      else if (cleanId.startsWith('9')) giZone = 'os_cht';
      body = `voucherPricePoint.id=116054&voucherPricePoint.price=16500.0&voucherPricePoint.variablePrice=0&user.userId=${encodeURIComponent(cleanId)}&user.zoneId=${giZone}&voucherTypeName=GENSHIN_IMPACT&shopLang=en_US`;
      break;
    }

    case 'valorant':
      body = `voucherPricePoint.id=115691&voucherPricePoint.price=15000.0&voucherPricePoint.variablePrice=0&user.userId=${encodeURIComponent(cleanId)}&voucherTypeName=VALORANT&voucherTypeId=109&gvtId=139&shopLang=en_US`;
      break;

    default:
      return null;
  }

  try {
    const res = await undiciFetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Origin': 'https://www.codashop.com',
        'Referer': 'https://www.codashop.com/',
      },
      body,
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`[Free Game Checker] ${gameId} Response:`, {
        success: data.success,
        errorCode: data.errorCode,
        errorMsg: data.errorMsg,
        username: data.confirmationFields?.username,
      });

      // 1. Success: Player exists and real nickname is found!
      if (data.success && data.confirmationFields && data.confirmationFields.username) {
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

      // 2. Verified Invalid User ID from game server
      if (data.errorCode === -100 || (data.errorMsg && data.errorMsg.toLowerCase().includes('invalid user id'))) {
        return {
          success: false,
          isReal: false,
          invalidId: true,
          error: 'រកមិនឃើញគណនីហ្គេមនេះទេ (Invalid In-Game User ID) សូមពិនិត្យមើល ID & Zone ឡើងវិញ',
        };
      }
    }
  } catch (err) {
    console.warn('[Free Game Checker] Network error:', err.message);
  }

  return null;
}
