# 🍽️ The Spice Route Cuisine - Premium Indian Restaurant Website

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://whysahil.github.io/The-Spice-Route-Cuisine/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub](https://img.shields.io/github/stars/Whysahil/The-Spice-Route-Cuisine?style=social)](https://github.com/Whysahil/The-Spice-Route-Cuisine)

> A feature-rich, fully responsive restaurant website showcasing authentic Indian cuisine with complete e-commerce functionality. Built with modern web technologies for an exceptional user experience across all devices.

**[🌐 Live Demo](https://whysahil.github.io/The-Spice-Route-Cuisine/)** | **[📱 Mobile View](https://whysahil.github.io/The-Spice-Route-Cuisine/)** | **[🍴 Menu](https://whysahil.github.io/The-Spice-Route-Cuisine/menu-page.html)**

## ✨ Key Features

### 🛒 Online Ordering System
- **Smart Shopping Cart** - Add/remove dishes with live cart updates
- **Quantity Management** - Increase/decrease item quantities easily
- **Order Summary** - Real-time total calculation
- **WhatsApp Integration** - Seamless order placement via WhatsApp
- **Persistent Cart** - Cart data saved in browser localStorage

### 📅 Table Reservation System
- **Interactive Booking Form** - Date, time, and guest selection
- **Special Requests** - Custom notes for dietary preferences
- **Instant Confirmation** - WhatsApp booking confirmation
- **Smart Validation** - Form validation with date/time restrictions

### 🍴 Advanced Menu Features
- **Dynamic Filtering** - Filter by Breakfast, Lunch, Dinner
- **Dietary Filters** - Vegetarian, Non-Veg, Vegan, Jain options
- **Real-time Search** - Search dishes by name or ingredients
- **Spice Level Indicators** - Visual spice intensity (🌶️)
- **Allergen Tags** - Clear dietary information (🟢 Veg, 🔴 Non-Veg)
- **Calorie Information** - Nutritional details for each dish

### 🌐 Multi-Language Support
- **Language Toggle** - Switch between English and Hindi
- **Persistent Preference** - Language choice saved in browser
- **Floating Button** - Easy access language switcher
### 🤖 chatbot
-Floating AI chatbot integrated into the restaurant website

-Multi-cuisine menu support (Indian, American, Italian, French, British)

-Smart dish search by name, ingredients, tags, calories, and preferences

-Cuisine filter pills for quick menu browsing

-Dynamic dish cards with price, rating, calories, spice level, and ingredients

-Veg / Non-Veg, spicy, healthy, and dessert recommendations

-Quick suggestion chips for instant user interaction

-Typing indicator and smooth conversational flow

-Modern glassmorphism UI with animations

-Fully responsive (mobile & desktop)


### 🌓 Dark/Light Mode
- **Theme Toggle** - Beautiful dark and light color schemes
- **System Sync** - Remembers user preference
- **Smooth Transitions** - Elegant theme switching animations

### 💬 Customer Engagement
- **WhatsApp Floating Button** - Direct customer support access
- **Customer Reviews** - Star ratings and testimonials
- **Toast Notifications** - User-friendly feedback messages
- **Newsletter Subscription** - Email signup for updates

### 🎨 Design & UX
- **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - GSAP-powered transitions
- **Interactive Galleries** - Swipeable image sliders
- **Modern UI/UX** - Clean, elegant, and intuitive design
- **Loading Animations** - Beautiful preloader
- **Parallax Effects** - Engaging scroll animations

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Modern JavaScript features
- **jQuery** - DOM manipulation and AJAX

### Libraries & Frameworks
- **Bootstrap 5** - Responsive grid system
- **GSAP (GreenSock)** - Professional animations
- **Swiper.js** - Touch slider
- **MixItUp** - Filtering and sorting
- **Parallax.js** - Parallax effects
- **FancyBox** - Lightbox gallery
- **Unicons** - Beautiful icons

### Features & APIs
- **LocalStorage API** - Cart and preference persistence
- **WhatsApp Business API** - Order and booking integration

## 📱 Responsive Design

Fully optimized for all devices with mobile-first approach:
- 📱 **Mobile** - Perfect experience on phones (320px - 767px)
- 📱 **Tablet** - Optimized for tablets (768px - 991px)
- 💻 **Laptop** - Full features on laptops (992px - 1199px)
- 🖥️ **Desktop** - Enhanced experience (1200px+)

## 🚀 Quick Start

### Option 1: Direct Use
1. Clone the repository
```bash
git clone https://github.com/Whysahil/The-Spice-Route-Cuisine.git
```

2. Navigate to the project directory
```bash
cd The-Spice-Route-Cuisine
```

3. Open `index.html` in your browser or use a local server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Then visit http://localhost:8000
```

### Option 2: GitHub Pages
Fork this repository and enable GitHub Pages in repository settings to get a live URL instantly!

## 🎨 Customization

### Colors
Modify CSS variables in `style.css`:
```css
:root {
    --primary-color: #ff8243;
    --bg-color: #fff;
    --text-color: #0d0d25;
    /* ... more variables */
}
```

### Menu Items
Update dishes in `index.html`:
```html
<div class="dish-box" data-dish='{"name":"Dish Name","price":299}'>
    <!-- Dish content -->
</div>
```

### Contact Information
Update WhatsApp number in `main.js`:
```javascript
const whatsappNumber = '918866998866'; // Your number
```

## 📁 Project Structure

```
The-Spice-Route-Cuisine/
│
├── index.html              # Main homepage
├── menu-page.html          # Detailed menu page
├── style.css               # Main stylesheet (3000+ lines)
├── main.js                 # Core JavaScript functionality
├── main-PROFESSIONAL.js    # Enhanced production version
├── logo.png1.png           # Restaurant logo
├── .gitignore              # Git ignore rules
├── LICENSE                 # MIT License
├── README.md               # Project documentation
│
└── assets/
    ├── css/                # External CSS libraries
    │   ├── bootstrap.min.css
    │   ├── swiper-bundle.min.css
    │   └── jquery.fancybox.min.css
    │
    ├── js/                 # JavaScript libraries
    │   ├── jquery-3.5.1.min.js
    │   ├── gsap.min.js
    │   ├── swiper-bundle.min.js
    │   └── [other libraries]
    │
    └── images/             # Image assets
        ├── dish/           # Food images (10+)
        ├── blog/           # Blog images
        ├── chef/           # Team photos
        ├── testimonials/   # Customer photos
        └── brands/         # Partner logos
```

## 🔧 Configuration

### WhatsApp Integration
Update the phone number in `main.js`:
```javascript
const whatsappNumber = '918866998866'; // Replace with your number
```

### Customization
Update dishes, colors, and content directly in:
- `index.html` - Menu items and content
- `style.css` - Color scheme (CSS variables in `:root`)
- `main.js` - Functionality and integrations

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sahil Singh (Whysahil)**
- GitHub: [@Whysahil](https://github.com/Whysahil)
- Portfolio: Full-stack web development
- Role: Design, Development, and Deployment

## 🌟 Features Showcase

### Live Demo Screenshots
Visit the [live demo](https://whysahil.github.io/The-Spice-Route-Cuisine/) to see:
- ✅ Responsive design in action
- ✅ Dark/Light mode toggle
- ✅ Shopping cart functionality
- ✅ Interactive menu filtering
- ✅ Table reservation system
- ✅ WhatsApp integration

## 📈 Project Stats

- **Lines of Code**: 35,000+
- **Files**: 85+
- **Commits**: Active development
- **Technologies**: 10+ libraries
- **Responsive Breakpoints**: 5+

## 🙏 Acknowledgments

- **Icons** - [Unicons by Iconscout](https://unicons.iconscout.com/)
- **Fonts** - [Google Fonts](https://fonts.google.com/) (Playfair Display, Poppins)
- **Libraries** - GSAP, Swiper, Bootstrap, jQuery

---

**Copyright © 2025-2026 The Spice Route Cuisine. All Rights Reserved.**

⭐ Star this repo if you find it helpful!

Made with ❤️ and ☕ by [Mayank kumar](https://github.com/mayank-563)
