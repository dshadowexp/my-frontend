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

const AddTodoInput = ({ name, value, placeholder, onChange }) => <input 
            type="text" 
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="add__todo__input" 
        />;

export default function AddTodo({ isAdd, title, setTitle, addTodo, updateTodo, cancelEdit }) {
    return <div className="add__todo">
        {
            inputs.map((input, index) => 
                <AddTodoInput 
                    key={index} 
                    name={input.name}
                    value={title} 
                    onChange={setTitle}
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