// src/services/api/wit.ts

const WIT_API_URL = "https://api.wit.ai/message";
const WIT_API_VERSION = "20251028";
const WIT_TOKEN = process.env.NEXT_PUBLIC_WIT_API_KEY;

interface WitEntity {
  value?: string;
  body?: string;
  confidence?: number;
  [key: string]: unknown;
}

interface WitEntities {
  [key: string]: WitEntity[] | undefined;
}

export interface WitResponse {
  text: string;
  intents: Array<{ id: string; name: string; confidence: number }>;
  entities: WitEntities;
  traits: Record<
    string,
    Array<{ id: string; value: string; confidence: number }>
  >;
}

export interface ExtractedContact {
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  confidence: number;
  raw: WitResponse;
}

export const witApi = {
  async extract(message: string): Promise<ExtractedContact> {
    try {
      const queryParams = new URLSearchParams({
        v: WIT_API_VERSION,
        q: message,
      });

      const response = await fetch(`${WIT_API_URL}?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${WIT_TOKEN}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `Wit.ai API error: ${response.status}`);
      }

      const data: WitResponse = await response.json();
      const entities = data.entities || {};

      const pick = (key: string) => {
        const e = entities[key]?.[0];
        return e ? (e.value ?? e.body ?? null) : null;
      };

      return {
        name: pick("name"),
        email: pick("email"),
        phone: pick("phone_number"),
        address: pick("address"),
        confidence: entities.name?.[0]?.confidence || 1,
        raw: data,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("❌ Wit.ai API error:", errorMessage);
      throw new Error("Failed to extract data from Wit.ai");
    }
  },
};
