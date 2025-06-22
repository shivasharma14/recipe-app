import { useEffect, useRef, useState } from "react";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";
import ClaudeRecipe from "./ClaudeRecipe";

export default function Content() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string>("");

  const recipeSection = useRef<HTMLElement | null>(null); //to reference a particluar DOM node

  useEffect(() => {
    if (recipe != "" && recipeSection.current != null)
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
  }, [recipe]);

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
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          ref={recipeSection}
        />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
