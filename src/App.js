import React, {Component} from 'react';
import {data as dt} from './data'
import Table from "./components/Table/Table";
import FormAdd from "./components/FormAdd/FormAdd";
import _ from 'lodash'


export default class App extends Component{
    constructor(props) {
        super(props);
        this.changeData = this.changeData.bind(this)
        this.addElement = this.addElement.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        this.updateData = this.updateData.bind(this)

        const get = JSON.parse(localStorage.getItem('data'))
        let data_storage
        if(get !== null){
            data_storage = get
        }else{
            data_storage = dt
        }


        this.state = {
            data:data_storage,
            name:'',
            type:'',
            color:'',
            sort: 'asc',
            sortField:'name',
            errors:{
                name:'',
                type:'',
                color:'',
            },
            alert:false
        }

    }

    componentDidMount() {

        this.setState({
            data:_.orderBy(this.state.data, this.state.sortField, this.state.sort)
        })



    }

    onSort = (sortField) =>{
        const clonedData = this.state.data.concat() // клонируем массив из state чтобы случайно не изменить исходные данные
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc' // выбор метода сортировки

        const data = _.orderBy(clonedData, sortField, sort) // создание нового объекта data при помощи библиотеки logash,
        // которая на вход получала 3 параметра, необходимый массив, по какому полю фильтровать
        // и в какую сторону фильтровать

        this.setState({
            data,
            sort,
            sortField,
        })
    }

    changeData(e, item){
        if(item === 'name'){
            let content = e.target.value
            this.setState({name:content})
        } else if(item === 'type'){
            let content = e.target.value
            this.setState({type:content})
        }else{
            let content = e.hex
            this.setState({color:content})
        }
    }


    addElement(){
        let errors = {}
        const {name, type, color, data} = this.state

        if(!name){
            errors.name = 'Это поле не может быть пустым'
        }
        if(!type){
            errors.type = 'Это поле не может быть пустым'
        }
        if(!color){
            errors.color = 'Это поле не может быть пустым'
        }

        if(errors.name || errors.type || errors.color){
            this.setState({errors, alert:true})
            setTimeout(this.closeAlert, 2000)
        }else{
            let newData = {
                name:this.state.name,
                type:this.state.type,
                color:this.state.color,
            }
            data.push(newData)
            this.setState({data})

            localStorage.setItem('data', JSON.stringify(data))

        }

    }

    updateData(data_res, item, col, oldData){
        if(data_res !== oldData){
            const {data} = this.state
            let result = data.indexOf(item)

            data[result].col = data_res
            this.setState({data})

            localStorage.setItem('data', JSON.stringify(data))
        }
    }

    closeAlert = () =>{
        this.setState({alert:false})
    }

    deleteRow(item){
        const {data} = this.state
        let result = data.indexOf(item)
        data.splice(result, 1)
        this.setState({data})

        localStorage.setItem('data', JSON.stringify(data))
    }


    render() {
        return(
            <div className='container'>
                <h1>Тестовое задание для группы компании Триумф</h1>
                <FormAdd
                    addElement={this.addElement}
                    changeData={this.changeData}
                />
                {this.state.alert? 'Ошибка': null

                }
                <Table
                    data={this.state.data}
                    deleteRow={this.deleteRow}
                    updateData={this.updateData}
                    onSort={this.onSort}
                    sortField={this.state.sortField}
                    sort={this.state.sort}
                />
            </div>
        )
    }
}
