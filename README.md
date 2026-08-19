# workshop-spa

L'app à déployer pendant le workshop **AWS + Terraform**. Elle n'est pas le sujet : c'est juste
l'objet qu'on va déplacer jusqu'à un bucket S3 servi par CloudFront.

## Prendre votre copie

Cliquez **« Use this template »** → **« Create a new repository »**, avec :

- **Owner** : `MolotovTv`
- **Repository name** : `workshop-spa-<votreprenom>`

Puis :

```bash
git clone git@github.com:MolotovTv/workshop-spa-<votreprenom>.git
cd workshop-spa-<votreprenom>
mise install     # installe la version de Node déclarée dans mise.toml
npm install
npm run build    # produit dist/
```

## Ce qu'il y a dedans

Une app React créée avec Vite, avec deux particularités qui servent chacune une démo :

- **deux routes** (`/` et `/about`) via `history.pushState`, sans react-router. Un F5 sur `/about`
  demande la clé `/about` à S3 — c'est ce qui justifie le fallback `403 → /index.html`.
- **un marqueur `VERSION`** affiché à l'écran, dans `src/App.jsx`. On le passe de `v1` à `v2` pour
  constater qu'un edge CloudFront sert encore l'ancienne version.

## Session 2

Vous écrirez `.github/workflows/deploy.yml`, qui a besoin de trois **variables de repo**
(Settings → Secrets and variables → Actions → Variables), toutes issues des outputs Terraform :

| Variable | Source |
| --- | --- |
| `AWS_ROLE_ARN` | `terraform output github_actions_role_arn` |
| `BUCKET` | `terraform output bucket_name` |
| `DISTRIBUTION_ID` | `terraform output distribution_id` |
