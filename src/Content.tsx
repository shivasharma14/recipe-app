import { useState } from "react";
import IngredientsList from "./components/IngredientsList";
import { getRecipeFromMistral } from "./ai";
import ClaudeRecipe from "./components/ClaudeRecipe";

export default function Content() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string>("");

  async function getRecipe() {
    const recipeMarkdown = (await getRecipeFromMistral(ingredients)) as string;
    //console.log(recipeMarkdown)
    setRecipe(recipeMarkdown);
  }

  // This is if we are using the onSubmit inside the form in place of the action (we need to explicitly prevent defaults here)

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //     event.preventDefault();
  //     const formData = new FormData(event.currentTarget);
  //     const newIngredient = formData.get("ingredient");

  //     if (typeof newIngredient === "string" && newIngredient.trim() !== "") {
  //         setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  //     }
  // }

  function handleSubmit(formData: any) {
    const newIngredient = formData.get("ingredient");

    if (typeof newIngredient === "string" && newIngredient.trim() !== "") {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
  }

  return (
    <main>
      <form action={handleSubmit} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {recipe && <ClaudeRecipe recipe={recipe}/>}
    </main>
  );
}
