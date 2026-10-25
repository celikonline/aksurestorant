# Aksu Kasap & Restaurant

Türkçe, mobil uyumlu ve bağımlılık gerektirmeyen restoran sitesi.

## Çalıştırma

Bu klasörde `npm run dev`, ardından http://127.0.0.1:5188 adresini açın.
JavaScript ve yerel medya referanslarını kontrol etmek için `npm run check` kullanın. `npm run build` aynı doğrulamayı gerçekleştirir; site zaten statik `dist/` klasöründen sunulur.

## İçerikler

Logo ve 12 gönderi görseli, kullanıcının sağladığı https://www.instagram.com/aksukasaprestaurant/ profilinin tarayıcıda görünen içeriklerinden indirildi. Menü çeşitleri ve çalışma saatleri profil açıklamasından ve gönderi açıklamalarından alındı. Subaşı adresi gönderi görselinde yer alıyor.

Medya akışında 12 gönderinin tamamı DOM'da bulunur; görseller tarayıcının yerel lazy loading özelliğiyle, videolar görünür alana yaklaşınca yüklenir. Kartlar animasyon yüzünden gizli kalmaz. Kategori filtreleri, görsel büyütme, klavye ile ileri/geri gezinme, dokunarak görsel değiştirme ve mobil menü bulunur. Hareket azaltma tercihi desteklenir.

Gönderiler `dist/posts.js`, etkileşimler `dist/experience.js`, görsel yön `dist/cinema.css` içinde tutulur. Görseller ve videolar yerel dosyalardır; Instagram CDN bağlantılarının süresi dolsa da çalışırlar.

İki video, tarayıcıda gerçekten oynayan `Deot74ggbwy` ve `DerUyxKAbTw` paylaşımlarının gözlemlenen medya kaynaklarından alındı. İlk indirme denemesinin CORS hatasından sonra, gözlemlenen aynı dosya adreslerinden normal HTTP indirmesi yapıldı; oturum çerezi veya hesap anahtarı dışa aktarılmadı. Videolar H.264 / yuv420p / faststart biçimine dönüştürüldü ve sessiz kullanıldı. 17 saniyelik açılış filmi bu iki çekimden kurgulandı. Diğer gönderilerde yerel kapak görselleri ve orijinal Instagram bağlantıları bulunur. Otomatik Instagram eşitlemesi yoktur.

## Yayın

Statik yayın klasörü `dist/`; Sites proje kimliği `.openai/hosting.json` içinde saklanır. Vercel için depo kökündeki `vercel.json` hazırdır. GitHub deposunu Vercel'e aktarırken Root Directory alanını depo kökü (`.`) olarak bırakın. Ayrıntılar [VERCEL.md](VERCEL.md) dosyasındadır.

Fiyat, telefon, rezervasyon sistemi veya kullanıcı yorumu uydurulmamıştır. İletişim için resmi Instagram hesabına, konum için Google Maps aramasına yönlendirilir.

## Menü

`dist/menu.html` tam boy afişi, indirme bağlantısını ve mobilde okunabilir ürün listesini sunar. `dist/assets/aksu-menu.png`, kullanıcının referans afişi, Aksu'nun gerçek tabağı ve logosu rehber alınarak yerleşik ImageGen ile oluşturulmuştur. Yemek fotoğrafları illüstratiftir; orijinal restoran çekimleri olarak sunulmaz. Üretim notları ve istem `design/menu-generation.md` dosyasındadır.
