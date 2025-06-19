import { useState } from "react"

export default function Content() {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [recipeShown, setRecipeShown] = useState<boolean>(false);

    function toggleRecipeShown(){
        setRecipeShown(prevShown => !prevShown)
    }

    const ingredientsList = ingredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
    ));

    // This is if we are using the onSubmit inside the form in place of the action (we need to explicitly prevent defaults here)

    // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);
    //     const newIngredient = formData.get("ingredient");

    //     if (typeof newIngredient === "string" && newIngredient.trim() !== "") {
    //         setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    //     }
    // }

    function handleSubmit(formData: any){
        const newIngredient = formData.get("ingredient");

        if (typeof newIngredient === "string" && newIngredient.trim() !== "") {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
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
            { ingredients.length > 0 && <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">
                    {ingredientsList}
                </ul>
                {ingredients.length>3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button>Get a recipe</button>
                </div>}
            </section> }
        </main>
    );
}
