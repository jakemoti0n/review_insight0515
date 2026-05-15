# 데이터베이스 구조 문서

# Database
Supabase

---

# 테이블명
analysis_logs

---

# 컬럼 구조

| 컬럼명 | 타입 |
|---|---|
| id | uuid |
| input_text | text |
| sentiment | varchar |
| confidence | int |
| reason | text |
| created_at | timestamptz |

---

# SQL

```sql
create table analysis_logs (
  id uuid primary key default gen_random_uuid(),
  input_text text not null,
  sentiment varchar(20) not null,
  confidence int not null,
  reason text not null,
  created_at timestamptz default now()
);
```
