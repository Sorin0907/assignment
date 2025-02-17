# Quiz Component

A React-based interactive quiz component that presents questions with toggle switches. Users must select correct answers by toggling switches, with real-time feedback through background color changes and animations.

## Assumtions

- Each toggle suports 2-3 options
- The background color, text color and border color should change based on the score
- If the text does not fit in the container it should change the toggle orientation to vertical
- Questions, toggles and sellection randomization
- Responsive design (down to 320px)
- hover effect with shadow

## Limitation

- The UI is not fully optimised for very long answers
- The index of the correct answer is imutable
- No persistent storage, quizz progress is lost on refresh
- Can handle only one type of questions (with toggle)
- can't have more then one correct answer

## Posible improvments

- Handle long text options or handle at the creation level
- Add one more prop for QuizQuestion e.g. `moreInfo` to give more info after the completion or `linkToResources` in case that user would need to refresh their knowledge
- can update `type` to `type Question` so it would be posible to have a quiz with different kind of questions

## URL

the component can be visualised at https://toggle-quiz.netlify.app/

