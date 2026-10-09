import { POPULAR_GAMES } from '../data/games';
import type { Game, GameDenomination } from '../types';

const CATALOG_STORAGE_KEY = 'aura_custom_catalog';

/**
 * Service to manage games, pricing, and media images
 */
class CatalogService {
  private games: Game[] = [];
  private listeners: Array<(games: Game[]) => void> = [];

  constructor() {
    this.games = this.loadGames();
  }

  private loadGames(): Game[] {
    try {
      const stored = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((g: Game) => {
            const def = POPULAR_GAMES.find((p) => p.id === g.id);
            if (def && (!g.banner || g.banner.includes('YrkR-GP7OKghBTAT') || g.banner.includes('ZHLmkdTW2Q'))) {
              return { ...g, banner: def.banner };
            }
            return g;
          });
        }
      }
    } catch (e) {
      console.warn('[CatalogService] Failed to load local catalog:', e);
    }
    return JSON.parse(JSON.stringify(POPULAR_GAMES));
  }

  public getGames(): Game[] {
    return this.games;
  }

  public getGameById(id: string): Game | undefined {
    return this.games.find((g) => g.id === id);
  }

  public saveGames(updatedGames: Game[]): void {
    this.games = updatedGames;
    try {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(updatedGames));
    } catch (e) {
      console.error('[CatalogService] Failed to save catalog:', e);
    }
    this.notify();
    this.syncBackend(updatedGames);
  }

  public updateGame(updatedGame: Game): void {
    const nextGames = this.games.map((g) => (g.id === updatedGame.id ? updatedGame : g));
    this.saveGames(nextGames);
  }

  public updateGameMedia(gameId: string, banner: string, thumbnail: string): void {
    const game = this.getGameById(gameId);
    if (!game) return;
    const updated = { ...game, banner, thumbnail };
    this.updateGame(updated);
  }

  public updateDenomination(
    gameId: string,
    denomId: string,
    updates: Partial<GameDenomination>
  ): void {
    const game = this.getGameById(gameId);
    if (!game) return;

    const nextDenoms = game.denominations.map((d) => {
      if (d.id === denomId) {
        return { ...d, ...updates };
      }
      return d;
    });

    const updated = { ...game, denominations: nextDenoms };
    this.updateGame(updated);
  }

  public addDenomination(gameId: string, newDenom: GameDenomination): void {
    const game = this.getGameById(gameId);
    if (!game) return;
    const updated = {
      ...game,
      denominations: [...game.denominations, newDenom],
    };
    this.updateGame(updated);
  }

  public deleteDenomination(gameId: string, denomId: string): void {
    const game = this.getGameById(gameId);
    if (!game) return;
    const updated = {
      ...game,
      denominations: game.denominations.filter((d) => d.id !== denomId),
    };
    this.updateGame(updated);
  }

  public resetToDefault(): Game[] {
    localStorage.removeItem(CATALOG_STORAGE_KEY);
    this.games = JSON.parse(JSON.stringify(POPULAR_GAMES));
    this.notify();
    this.syncBackend(this.games);
    return this.games;
  }

  public subscribe(listener: (games: Game[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.games);
      } catch (err) {
        console.error('[CatalogService] Listener error:', err);
      }
    });
  }

  private async syncBackend(games: Game[]): Promise<void> {
    try {
      await fetch('/api/admin/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ games }),
      });
    } catch {
      // offline or backend not ready
    }
  }
}

export const catalogService = new CatalogService();

