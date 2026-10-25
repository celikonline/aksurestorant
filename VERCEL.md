# Vercel kurulumu

GitHub deposu: https://github.com/celikonline/aksurestorant

Vercel'de **Add New → Project** üzerinden bu depoyu içe aktarın. Depo kökündeki `vercel.json` şu ayarları uygular:

| Ayar | Değer |
| --- | --- |
| Framework Preset | Other |
| Root Directory | `.` (depo kökü) |
| Build Command | `node scripts/verify.mjs` |
| Output Directory | `dist` |
| Install Command | `echo No dependencies required` |
| Environment Variables | Gerekmez |

Site bağımlılık gerektirmeyen statik HTML, CSS ve JavaScript kullanır. `npm run build`, JavaScript sözdizimini ve yerel medya referanslarını kontrol eder. Videolar H.264 MP4 olarak yerel `dist/assets/` klasöründen sunulur.

CLI ile önizleme için depo kökünde `npx vercel`, üretim yayını için `npx vercel --prod` çalıştırılabilir. Vercel oturumu gerekir.

`.vercelignore`, yerel araçları ve Sites yapılandırmasını Vercel yüklemesinin dışında tutar. Medya için önbellek ve temel yanıt başlıkları `vercel.json` içinde tanımlıdır.
