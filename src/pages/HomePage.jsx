
import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ResourceSection from "../components/ResourceSection";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Header />
      <main>
        <Hero />

        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <ResourceSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </main>
    </>
  );
}

export default HomePage;
