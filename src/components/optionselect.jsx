import React from "react";

export default function Optionselect (props){

return(
<div>   
         <h1>selecione uma opção {props.name}</h1>
        <label> opção </label>
        <select name="select" id={props.index}>
        <option> op 1 {props.name}</option>
        <option> op 2 {props.idade}</option>
        </select>
        </div>

);
}