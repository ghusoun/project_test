import React, { useEffect, useState } from 'react';
import Dish from './Dish'
import db from './db'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';


function Dishes() {

    const [dishes, setDishes] = useState([])

    useEffect(() => {
        const getData = async () => {
            setDishes(await db.Dishes.findAll())
        }
        getData()
    }, [])

    const [dishId, setId] = useState("")
    const [name, setName] = useState("")
    const [calories, setCalories] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [availableTo, setAvailableTo] = useState(null)
    const [mealId, setMealId] = useState("")

    const [meals, setMeals] = useState([])
    useEffect(
        () => {
            const getData = async () => {
                setMeals(await db.Meals.findAll())
            }
            getData()
        },
        []
    )

    // must support all CRUD operations

    // step 1 of editing
    const edit = dish => {
        setId(dish.id)
        setName(dish.name)
        setCalories(dish.calories)
        setQuantity(dish.quantity)
        setAvailableTo(dish.availableTo)
        setMealId(dish.mealId)
    }

    // step 2 of editing (save)
    const save = async () => {
        await db.Dishes.update({ id: dishId, name, calories, quantity, availableTo, mealId })
        setDishes(await db.Dishes.findAll())
        setId("")
        setName("")
        setCalories(0)
        setQuantity(0)
        setAvailableTo(null)
        setMealId("")
    }

    const remove = async dishId => {
        await db.Dishes.remove(dishId)
        setDishes(await db.Dishes.findAll())
    }

    const create = async () => {
        await db.Dishes.create({ id: dishId, name, calories, quantity, availableTo, mealId })
        setDishes(await db.Dishes.findAll())
        setId("")
        setName("")
        setCalories(0)
        setQuantity(0)
        setAvailableTo(null)
        setMealId("")
    }


    const [validCreate, setValidCreate] = useState(false)

    useEffect(() => {
        const validateCreate = async () =>
            dishId.length > 0 &&
            name.length > 0 &&
            calories >= 0 &&
            quantity >= 0 &&
            availableTo.toISOString().split("T")[0] >= new Date().toISOString().split("T")[0] &&
            mealId.length > 0 &&
            undefined !== await db.Meals.findOne(mealId) &&
            undefined === await db.Dishes.findOne(dishId)

        const getData = async () => {
            setValidCreate(await validateCreate())
        }
        getData()
    }, [dishId, name, calories, quantity, availableTo, mealId])

    const [validEdit, setValidEdit] = useState(false)

    useEffect(() => {
        const validateEdit = async () =>
            dishId.length > 0 &&
            name.length > 0 &&
            calories >= 0 &&
            quantity >= 0 &&
            availableTo.toISOString().split("T")[0] >= new Date().toISOString().split("T")[0] &&
            mealId.length > 0 &&
            undefined !== await db.Meals.findOne(mealId) &&
            undefined !== await db.Dishes.findOne(dishId)

        const getData = async () => {
            setValidEdit(await validateEdit())
        }
        getData()
    }, [dishId, name, calories, quantity, availableTo, mealId])

    const total = dishes.reduce((sum, dish) => sum + dish.quantity * dish.calories, 0)

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Calories</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Available To Date</TableCell>
                            <TableCell>Meal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField id="DishId" label="Dish Id" value={dishId} onChange={event => setId(event.target.value)} />
                            </TableCell>
                            <TableCell>
                                <TextField id="Name" label="Name" value={name} onChange={event => setName(event.target.value)} />
                            </TableCell>
                            <TableCell>
                                <TextField id="Calories" label="Calories" value={calories} onChange={event => setCalories(1 * event.target.value)} />
                            </TableCell>
                            <TableCell>
                                <TextField id="Quantity" label="Quantity" value={quantity} onChange={event => setQuantity(1 * event.target.value)} />
                            </TableCell>
                            <TableCell>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        id="AvailableTo"
                                        label="Available To Date"
                                        format="MM/dd/yyyy"
                                        value={availableTo}
                                        onChange={setAvailableTo}
                                    />
                                </MuiPickersUtilsProvider>
                            </TableCell>
                            <TableCell>
                                {/* <TextField id="MealId" label="Meal Id" value={mealId} onChange={event => setMealId(event.target.value)} /> */}
                                <FormControl style={{ minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-label">Meal</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="MealId"
                                        value={mealId}
                                        onChange={event => setMealId(event.target.value)}
                                    >
                                        {
                                            meals.map(meal => <MenuItem key={meal.id} value={meal.id}>{meal.type}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={create} disabled={!validCreate}>
                                    Add new Dish
                                </Button>
                                &nbsp;
                                <Button variant="contained" color="primary" onClick={save} disabled={!validEdit}>
                                    Save
                                </Button>
                            </TableCell>
                        </TableRow>
                        {
                            dishes.map(
                                dish =>
                                    <Dish
                                        key={dish.id}
                                        dish={dish}
                                        edit={edit}
                                        remove={remove}
                                        {...dish} />
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h5" component="h2">
                {`Total Calories: ${total}`}
            </Typography>
        </>
    );
}

export default Dishes;
