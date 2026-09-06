export interface ParticipantRow {
  rank: number;
  athlete_id: string;
  total_score: number;
  username: string | null;
  level: string | null;
  elo: number | null;
  placement?: string | null;
  elo_change?: number | null;
}

export interface WodRanking {
  wod_id: string;
  wod_title: string;
  order_index: number;
  scores: {
    rank: number;
    athlete_id: string;
    score_value: string;
    score_display: string;
    is_ex_aequo: boolean;
    username: string | null;
    level: string | null;
  }[];
}

export interface DivisionRanking {
  division_id: string;
  name: string;
  level: number;
  promote_count: number;
  relegate_count: number;
  rows: ParticipantRow[];
}
