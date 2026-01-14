export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  isVegetarian?: boolean
  isSpicy?: boolean
}

export interface MenuCategory {
  id: string
  category: string
  description: string
  items: MenuItem[]
}

export const menuData: MenuCategory[] = [
  {
    id: "appetizers",
    category: "Appetizers",
    description: "Start your meal with our delicious selection of starters",
    items: [
      {
        id: "app-1",
        name: "Crispy Calamari",
        description: "Lightly battered squid rings served with zesty lemon aioli and marinara sauce",
        price: 14.99,
        image: "/crispy-calamari-appetizer-with-lemon.jpg",
      },
      {
        id: "app-2",
        name: "Bruschetta Trio",
        description: "Grilled ciabatta topped with fresh tomatoes, basil, and balsamic glaze",
        price: 11.99,
        image: "/bruschetta-trio-with-tomatoes-and-basil.jpg",
        isVegetarian: true,
      },
      {
        id: "app-3",
        name: "Spicy Buffalo Wings",
        description: "Crispy chicken wings tossed in our signature buffalo sauce with blue cheese dip",
        price: 13.99,
        image: "/spicy-buffalo-chicken-wings.jpg",
        isSpicy: true,
      },
      {
        id: "app-4",
        name: "Spinach Artichoke Dip",
        description: "Creamy blend of spinach and artichokes served with warm pita chips",
        price: 12.49,
        image: "/spinach-artichoke-dip-with-pita.jpg",
        isVegetarian: true,
      },
      {
        id: "app-5",
        name: "Garlic Shrimp Skewers",
        description: "Grilled jumbo shrimp with garlic butter and fresh herbs",
        price: 16.99,
        image: "/garlic-shrimp-skewers-grilled.jpg",
      },
      {
        id: "app-6",
        name: "Loaded Potato Skins",
        description: "Crispy potato skins filled with cheddar, bacon, and sour cream",
        price: 10.99,
        image: "/loaded-potato-skins-with-cheese-bacon.jpg",
      },
    ],
  },
  {
    id: "mains",
    category: "Main Courses",
    description: "Our signature dishes crafted with passion and premium ingredients",
    items: [
      {
        id: "main-1",
        name: "Grilled Ribeye Steak",
        description: "12oz prime ribeye with herb butter, roasted potatoes, and seasonal vegetables",
        price: 34.99,
        image: "/grilled-ribeye-steak-dinner-with-vegetables.jpg",
      },
      {
        id: "main-2",
        name: "Pan-Seared Salmon",
        description: "Atlantic salmon with lemon dill sauce, quinoa, and grilled asparagus",
        price: 28.99,
        image: "/pan-seared-salmon-with-asparagus.jpg",
      },
      {
        id: "main-3",
        name: "Chicken Parmesan",
        description: "Breaded chicken breast with marinara, melted mozzarella, and linguine",
        price: 24.99,
        image: "/chicken-parmesan-pasta.jpg",
      },
      {
        id: "main-4",
        name: "Thai Green Curry",
        description: "Coconut curry with tofu, vegetables, jasmine rice, and Thai basil",
        price: 19.99,
        image: "/thai-green-curry-bowl-with-rice.jpg",
        isVegetarian: true,
        isSpicy: true,
      },
      {
        id: "main-5",
        name: "Lobster Mac & Cheese",
        description: "Creamy four-cheese pasta with tender lobster chunks and truffle oil",
        price: 32.99,
        image: "/lobster-mac-and-cheese.jpg",
      },
      {
        id: "main-6",
        name: "Mushroom Risotto",
        description: "Arborio rice with wild mushrooms, parmesan, and white truffle oil",
        price: 22.99,
        image: "/mushroom-risotto.png",
        isVegetarian: true,
      },
      {
        id: "main-7",
        name: "BBQ Baby Back Ribs",
        description: "Slow-smoked pork ribs glazed with bourbon BBQ sauce, coleslaw, and fries",
        price: 29.99,
        image: "/bbq-baby-back-ribs-with-fries.jpg",
      },
      {
        id: "main-8",
        name: "Spicy Kung Pao Chicken",
        description: "Wok-fried chicken with peanuts, vegetables, and Sichuan peppers",
        price: 21.99,
        image: "/kung-pao-chicken-with-peanuts.jpg",
        isSpicy: true,
      },
      {
        id: "main-9",
        name: "Mediterranean Lamb Chops",
        description: "Herb-crusted lamb chops with couscous, tzatziki, and roasted peppers",
        price: 36.99,
        image: "/mediterranean-lamb-chops.jpg",
      },
    ],
  },
  {
    id: "sides",
    category: "Sides",
    description: "Perfect accompaniments to complement your main dish",
    items: [
      {
        id: "side-1",
        name: "Truffle Fries",
        description: "Crispy fries tossed with truffle oil, parmesan, and fresh herbs",
        price: 8.99,
        image: "/truffle-fries-with-parmesan.jpg",
        isVegetarian: true,
      },
      {
        id: "side-2",
        name: "Garlic Mashed Potatoes",
        description: "Creamy potatoes whipped with roasted garlic and butter",
        price: 6.99,
        image: "/garlic-mashed-potatoes.jpg",
        isVegetarian: true,
      },
      {
        id: "side-3",
        name: "Grilled Asparagus",
        description: "Tender asparagus with lemon zest and olive oil",
        price: 7.49,
        image: "/grilled-asparagus.jpg",
        isVegetarian: true,
      },
      {
        id: "side-4",
        name: "Caesar Salad",
        description: "Crisp romaine with classic Caesar dressing and croutons",
        price: 9.99,
        image: "/caesar-salad.png",
        isVegetarian: true,
      },
      {
        id: "side-5",
        name: "Mac & Cheese",
        description: "Classic baked macaroni with a crispy breadcrumb topping",
        price: 7.99,
        image: "/mac-and-cheese-baked.jpg",
        isVegetarian: true,
      },
      {
        id: "side-6",
        name: "Onion Rings",
        description: "Beer-battered onion rings with spicy chipotle mayo",
        price: 6.49,
        image: "/crispy-onion-rings.png",
        isVegetarian: true,
      },
    ],
  },
  {
    id: "desserts",
    category: "Desserts",
    description: "Sweet endings to complete your dining experience",
    items: [
      {
        id: "dessert-1",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, vanilla ice cream, and berries",
        price: 10.99,
        image: "/chocolate-lava-cake.jpg",
        isVegetarian: true,
      },
      {
        id: "dessert-2",
        name: "New York Cheesecake",
        description: "Classic creamy cheesecake with strawberry compote",
        price: 9.99,
        image: "/new-york-cheesecake-with-strawberry.jpg",
        isVegetarian: true,
      },
      {
        id: "dessert-3",
        name: "Tiramisu",
        description: "Italian classic with espresso-soaked ladyfingers and mascarpone",
        price: 11.49,
        image: "/classic-tiramisu-dessert.jpg",
        isVegetarian: true,
      },
      {
        id: "dessert-4",
        name: "Crème Brûlée",
        description: "Vanilla custard with caramelized sugar crust",
        price: 9.49,
        image: "/creme-brulee-dessert.jpg",
        isVegetarian: true,
      },
      {
        id: "dessert-5",
        name: "Apple Pie à la Mode",
        description: "Warm cinnamon apple pie with vanilla ice cream and caramel drizzle",
        price: 8.99,
        image: "/apple-pie-with-ice-cream.jpg",
        isVegetarian: true,
      },
    ],
  },
  {
    id: "drinks",
    category: "Drinks",
    description: "Refreshing beverages to quench your thirst",
    items: [
      {
        id: "drink-1",
        name: "Fresh Lemonade",
        description: "House-made lemonade with fresh mint leaves",
        price: 4.99,
        image: "/fresh-lemonade-with-mint.jpg",
        isVegetarian: true,
      },
      {
        id: "drink-2",
        name: "Iced Coffee",
        description: "Cold brew coffee served over ice with cream",
        price: 5.49,
        image: "/iced-coffee-cold-brew.jpg",
        isVegetarian: true,
      },
      {
        id: "drink-3",
        name: "Mango Smoothie",
        description: "Blended mango, yogurt, and honey",
        price: 6.99,
        image: "/mango-smoothie-yellow.jpg",
        isVegetarian: true,
      },
      {
        id: "drink-4",
        name: "Sparkling Water",
        description: "Premium sparkling mineral water",
        price: 3.49,
        image: "/sparkling-water-glass.jpg",
        isVegetarian: true,
      },
      {
        id: "drink-5",
        name: "Hot Chocolate",
        description: "Rich chocolate with whipped cream and marshmallows",
        price: 5.99,
        image: "/hot-chocolate-whipped-cream.jpg",
        isVegetarian: true,
      },
      {
        id: "drink-6",
        name: "Berry Blast Smoothie",
        description: "Mixed berries, banana, and almond milk",
        price: 7.49,
        image: "/berry-blast-smoothie.jpg",
        isVegetarian: true,
      },
    ],
  },
]
