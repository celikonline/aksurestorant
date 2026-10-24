# Aksu Kasap & Restaurant

Türkçe, mobil uyumlu ve bağımlılık gerektirmeyen restoran sitesi.

## Çalıştırma

Bu klasörde `npm run dev`, ardından http://127.0.0.1:5188 adresini açın.
JavaScript sözdizimini kontrol etmek için `npm run check` kullanın.

## İçerikler

Logo ve 12 gönderi görseli, kullanıcının sağladığı https://www.instagram.com/aksukasaprestaurant/ profilinin tarayıcıda görünen içeriklerinden indirildi. Menü çeşitleri ve çalışma saatleri profil açıklamasından ve gönderi açıklamalarından alındı. Subaşı adresi gönderi görselinde yer alıyor.

Medya akışı ilk altı gönderiyi gösterir; kaydırdıkça üçer gönderi yükler. Kategori filtreleri, görsel büyütme, klavye ile ileri/geri gezinme ve mobil menü bulunur. Hareket azaltma tercihi desteklenir.

Gönderiler `dist/app.js` içinde tutulur. Görseller yerel dosyalar olduğundan Instagram CDN bağlantılarının süresi dolsa da görünür kalır. Videoların asılları ilgili Instagram gönderisine bağlanır; Instagram hesabıyla otomatik eşitleme veya video dosyalarının yerel oynatımı yoktur. Instagram'ın blob video akışları tarayıcının medya indirme işlemiyle alınamadığı için videolar kopyalanmamıştır.

## Yayın

Statik yayın klasörü `dist/`; Sites proje kimliği `.openai/hosting.json` içinde saklanır. Fiyat, telefon, rezervasyon sistemi veya kullanıcı yorumu uydurulmamıştır. İletişim için resmi Instagram hesabına, konum için Google Maps aramasına yönlendirilir.
