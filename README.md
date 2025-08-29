# UEFA Kura Çekimi Simülatörü

UEFA Şampiyonlar Ligi, UEFA Avrupa Ligi ve UEFA Konferans Ligi için modern bir kura çekimi simülatörü uygulaması.

## 🏆 Özellikler

- **Üç UEFA Turnuvası Desteği**: Şampiyonlar Ligi, Avrupa Ligi ve Konferans Ligi
- **Gerçekçi Kura Algoritması**: UEFA kurallarına uygun kura çekimi
- **Modern UI/UX**: Responsive tasarım ve animasyonlar
- **Grup Yönetimi**: Otomatik grup oluşturma ve kısıtlama kontrolü
- **Geçmiş Takibi**: Önceki kura çekimlerini görüntüleme
- **Backend Entegrasyonu**: RESTful API ile veri yönetimi

## 🚀 Teknolojiler

- **Frontend**: React 18, TypeScript, Vite
- **UI Kütüphaneleri**: Framer Motion, Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Styling**: CSS3, Flexbox, Grid

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd uefa-draw-simulator-fe
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment dosyasını oluşturun:
```bash
cp .env.example .env
```

4. Backend API URL'sini ayarlayın:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 🔧 Geliştirme

### Mevcut Scriptler

- `npm run dev` - Geliştirme sunucusunu başlatır
- `npm run build` - Production build oluşturur
- `npm run preview` - Production build'i önizler
- `npm run lint` - ESLint ile kod kontrolü

### Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── Header.tsx      # Ana navigasyon
│   ├── TeamCard.tsx    # Takım kartı
│   └── GroupDisplay.tsx # Grup görüntüleme
├── pages/              # Sayfa bileşenleri
│   ├── Home.tsx        # Ana sayfa
│   ├── DrawSimulator.tsx # Kura simülatörü
│   └── DrawHistory.tsx # Geçmiş sayfası
├── services/           # API servisleri
│   └── api.ts         # HTTP istekleri
├── types/              # TypeScript tip tanımları
│   └── index.ts       # Ana tip tanımları
└── App.tsx            # Ana uygulama bileşeni
```

## 🌐 API Endpoints

Uygulama aşağıdaki backend API endpoint'lerini bekler:

### Yarışmalar
- `GET /api/competitions` - Tüm yarışmaları listele
- `GET /api/competitions/:id` - Belirli yarışmayı getir

### Takımlar
- `GET /api/teams/competition/:id` - Yarışma takımlarını getir
- `GET /api/teams/competition/:id/seeds` - Seri başı takımları getir
- `GET /api/teams/competition/:id/unseeds` - Seri başı olmayan takımları getir

### Kura Çekimi
- `POST /api/draw` - Yeni kura çekimi yap
- `GET /api/draw/history` - Kura geçmişini getir
- `GET /api/draw/:id` - Belirli kura sonucunu getir

## 🎨 Tasarım Özellikleri

- **Responsive Design**: Mobil ve masaüstü uyumlu
- **Dark Theme**: Modern koyu tema
- **Animasyonlar**: Framer Motion ile akıcı geçişler
- **Glassmorphism**: Modern cam efekti tasarım
- **Gradient Backgrounds**: UEFA renklerini yansıtan gradyanlar

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Güvenlik

- CORS desteği
- API key yönetimi (gerekirse)
- Input validation
- Error handling

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.
