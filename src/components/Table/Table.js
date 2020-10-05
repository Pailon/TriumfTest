import React from "react";

export default props =>(
    <table className="table">
        <thead>
            <tr>
                <th
                    onClick={props.onSort.bind(null, 'name')}
                >Name {props.sortField === 'name' ? <small>{props.sort}</small> : null}
                </th>
                <th
                    onClick={props.onSort.bind(null, 'type')}
                >Type {props.sortField === 'type' ? <small>{props.sort}</small> : null}
                </th>
                <th
                    onClick={props.onSort.bind(null, 'color')}
                >Color {props.sortField === 'color' ? <small>{props.sort}</small> : null}
                </th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
        {props.data.map((item,index)=>(
            <tr key={index}>
                <td
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                    onBlur={(event)=>{
                        let oldData = item.name
                        item.name = event.currentTarget.firstChild.data
                        props.updateData(item.name, item, 'name', oldData)
                    }}
                >{item.name}</td>
                <td
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                >{item.type}</td>
                <td
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                >{item.color}</td>
                <td>
                    <button
                        onClick={()=>props.deleteRow(item)}
                        className="btn btn-outline-primary"
                    >Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
)