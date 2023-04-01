import ActionButton from "./action-button.jsx";
import add_icon from "../assets/icons/add-outline.svg";
import update_icon from "../assets/icons/save-outline.svg";
import cancel_icon from "../assets/icons/close-outline.svg";

const inputs = [
    {
        'name': 'title',
        'placeholder': 'Enter ToDo Title'
    }
];

const AddTodoInput = ({ inputRef, name, placeholder }) => <input 
            type="text" 
            ref={inputRef}
            name={name}
            placeholder={placeholder}
            className="add__todo__input" 
        />;

export default function AddTodo({ isAdd, titleInputRef, addTodo, updateTodo, cancelEdit }) {
    return <div className="add__todo">
        {
            inputs.map((input, index) => 
                <AddTodoInput 
                    key={index}
                    inputRef={titleInputRef} 
                    name={input.name}
                    placeholder={''}
                />
            )
        }
        <div>
            {
                isAdd
                ?
                <ActionButton 
                    clickFn={addTodo}
                    iconURL={add_icon}
                    altText={"add"}
                    colorClass={"green__hover"}
                    imgSizeClass={"img__medium"}
                />
                :
                (
                    <>
                        <ActionButton 
                            clickFn={updateTodo}
                            iconURL={update_icon}
                            altText={"update"}
                            colorClass={"green__hover"}
                            imgSizeClass={"img__medium"}
                        />
                        <ActionButton 
                            clickFn={cancelEdit}
                            iconURL={cancel_icon}
                            altText={"cancel"}
                            colorClass={"yellow__hover"}
                            imgSizeClass={"img__medium"}
                        />
                    </>
                )
            }
        </div>
    </div>
}