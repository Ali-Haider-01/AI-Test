import { Injectable } from '@nestjs/common';
import * as modelsData from './data/models.json';

@Injectable()
export class ModelsService {
  private models: any[] = modelsData as any[];

  findAll(filters?: { type?: string; provider?: string; search?: string; limit?: number; offset?: number }) {
    let result = [...this.models];
    if (filters?.type && filters.type !== 'all') {
      result = result.filter(m => m.types?.includes(filters.type));
    }
    if (filters?.provider) {
      result = result.filter(m => m.org?.toLowerCase() === filters.provider?.toLowerCase());
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(m => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q) || m.lab.toLowerCase().includes(q));
    }
    const total = result.length;
    const offset = filters?.offset || 0;
    const limit = filters?.limit || 50;
    return { models: result.slice(offset, offset + limit), total, offset, limit };
  }

  findById(id: string) {
    return this.models.find(m => m.id === id) || null;
  }

  getProviders() {
    return [...new Set(this.models.map(m => m.org))].sort();
  }
}
