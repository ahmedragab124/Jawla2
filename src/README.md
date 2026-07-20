# Source structure

- `app/`: application shell and route composition.
- `pages/`: route-level pages that are not owned by a single feature.
- `features/`: self-contained product areas. Each feature may contain `pages`, `components`, `hooks`, `services`, and `styles`.
- `shared/`: reusable application-wide UI, such as the navigation and footer.
- `hooks/`: reusable cross-feature React hooks.
- `styles/`: global or shared styles.
- `assets/`: bundled images and other static imports.

Keep new code inside the owning feature whenever possible. Only use `shared/` for code reused by more than one feature.
