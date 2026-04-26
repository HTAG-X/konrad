---
name: Supabase setup
description: DB schema, buckety, RLS, auth, audit log
type: reference
---

**Tabulky:** projekty, blog_posts, site_config (id=1), usp, reference, audit_log
**Sloupce:** snake_case (uzitna_plocha, hlavni_foto, maklerka_jmeno...)
**Pole:** published (BOOLEAN), deleted (BOOLEAN) na projekty, blog_posts, reference
**Stavy projektu:** Volné, Rezervace, Zamluveno, Prodáno

**Storage buckety:** projekty-images (public), blog-images (public)
**RLS:** anonymní čtení published, authenticated CRUD

**Auth:** Supabase Auth, role v user_metadata ({"role": "admin"})
**Admin user:** konradamin@htag.cz

**Audit log:** user_id, user_email, akce, tabulka, zaznam_id, zaznam_nazev, ip_adresa, user_agent
