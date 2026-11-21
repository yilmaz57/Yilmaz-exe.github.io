// JS çalışıyorsa CSS'e haber ver (kaydırma efekti için)
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
  // Alt kısımdaki yılı otomatik güncelle
  var yil = document.getElementById("yil");
  if (yil) yil.textContent = new Date().getFullYear();

  // Kaydırınca bölümleri göster
  var bolumler = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var gozlemci = new IntersectionObserver(function (kayitlar) {
      kayitlar.forEach(function (kayit) {
        if (kayit.isIntersecting) {
          kayit.target.classList.add("in");
          gozlemci.unobserve(kayit.target);
        }
      });
    }, { threshold: 0.12 });
    bolumler.forEach(function (b) { gozlemci.observe(b); });
  } else {
    bolumler.forEach(function (b) { b.classList.add("in"); });
  }

  // Hareketi azalt ayarı açıksa yazı animasyonlarını atla
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  yaziAnimasyonu();
  kodAnimasyonu();
});

// 1) Başlığın altındaki yazı: yazılır, bekler, silinir, sıradaki yazılır
function yaziAnimasyonu() {
  var alan = document.getElementById("yazi");
  if (!alan) return;

  var metinler = [
    "Yazılım Geliştirici",
    "Siber Güvenlik",
    "Yazılım Geliştirici & Siber Güvenlik",
    "Veri Tabanı Yönetimi"
  ];
  var sira = 0;
  var harf = 0;
  var siliyor = false;

  function adim() {
    var metin = metinler[sira];
    harf += siliyor ? -1 : 1;
    alan.textContent = metin.slice(0, harf);

    var bekleme = siliyor ? 35 : 75;
    if (!siliyor && harf === metin.length) {
      siliyor = true;
      bekleme = 1800;
    } else if (siliyor && harf === 0) {
      siliyor = false;
      sira = (sira + 1) % metinler.length;
      bekleme = 400;
    }
    setTimeout(adim, bekleme);
  }

  alan.textContent = "";
  setTimeout(adim, 300);
}

// 2) Kod kartı: kod harf harf yazılır, bitince renklendirilmiş hali gelir
function kodAnimasyonu() {
  var kod = document.getElementById("kod");
  if (!kod) return;

  var renkliHtml = kod.innerHTML;
  var metin = kod.textContent;
  var i = 0;

  kod.textContent = "";

  var zamanlayici = setInterval(function () {
    i++;
    kod.textContent = metin.slice(0, i);
    if (i >= metin.length) {
      clearInterval(zamanlayici);
      kod.innerHTML = renkliHtml;
    }
  }, 28);
}