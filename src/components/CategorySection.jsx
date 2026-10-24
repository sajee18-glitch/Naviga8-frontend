
const categories = [
  { name: "Laboratory", icon: "🔬" },
  { name: "Workshop", icon: "🛠️" },
  { name: "Equipment", icon: "⚙️" },
  { name: "Software / Digital Resource", icon: "💻" },
  { name: "Shared Space", icon: "📚" },
];

function CategorySection({
  selectedCategory = "All",
  onSelectCategory = () => {},
}) {
  return (
    <section className="category-section" id="categories">
      <div className="category-heading">
        <span className="section-kicker">EXPLORE BY CATEGORY</span>
        <h2>What are you looking for?</h2>
        <p>Find the right facilities and resources for your engineering work.</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            className={`category-card ${
              selectedCategory === category.name ? "active" : ""
            }`}
            onClick={() =>
              onSelectCategory(
                selectedCategory === category.name
                  ? "All"
                  : category.name
              )
            }
          >
            <span className="category-icon" aria-hidden="true">
              {category.icon}
            </span>

            <span className="category-name">{category.name}</span>

            <span className="category-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>

      <button
        className="show-all-button"
        type="button"
        onClick={() => onSelectCategory("All")}
      >
        Show all resources
      </button>
    </section>
  );
}

export default CategorySection;
