import React from "react";
import InputColor from 'react-input-color';

function changeHandler(obj) {
    console.log(obj);
}

export default props =>(
    <form name="add" style={{marginRight:'70%'}}>
        <h5>Добавление</h5>
        <div className="form-group">
            <input onChange={(event)=>{props.changeData(event,'name')}} className="form-control form-control-sm" name="value" placeholder="name"/>
        </div>
        <div className="form-group">
            <input onChange={(event)=>{props.changeData(event,'type')}} className="form-control form-control-sm" name="type" placeholder="type"/>
        </div>
        <div className="form-group">
            <InputColor
                initialValue="#5e72e4"
                onChange={(event)=>{props.changeData(event,'color')}}
                placement="right"
            />
        </div>
        <button
            type="button"
            className="btn btn-primary"
            onClick={(() => {props.addElement()})}
        >Добавить</button>
    </form>
)