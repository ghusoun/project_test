import React, { useEffect, useState } from 'react';
import db from './db'
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function Dish({ dish, edit, remove, id, name, calories, quantity, availableTo, mealId }) {

    const [meal, setMeal] = useState({
        type: "",
        price: 0
    })

    useEffect(() => {
        const getData = async () => {
            setMeal(await db.Meals.findOne(mealId))
        }
        getData()
    }, [mealId])

    return (
        <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell align="right">{calories}</TableCell>
            <TableCell align="right">{quantity}</TableCell>
            <TableCell>{availableTo && availableTo.toLocaleDateString()}</TableCell>
            <TableCell>{meal.type}</TableCell>
            <TableCell>
                <Button variant="contained" color="primary" onClick={() => edit(dish)}>
                    Edit
            </Button>
            &nbsp;
            <Button variant="contained" color="primary" onClick={() => remove(id)}>
                    X
            </Button>
            </TableCell>
        </TableRow>
    );
}

export default Dish;
