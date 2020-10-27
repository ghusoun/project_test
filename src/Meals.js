import React, { useEffect, useState } from 'react';
import Meal from './Meal'
import MealAndDishes from './MealAndDishes'
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
import GridList from '@material-ui/core/GridList';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Meals() {

    const [selected, setSelected] = useState(null)
    const [id, setId] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")

    const [meals, setMeals] = useState([])
    useEffect(
        () => {
            const getData = async () =>{
                setMeals(await db.Meals.findAll())
            }
            getData()
        },
        []
    )

    const edit = meal => {
        setId(meal.id)
        setType(meal.type)
        setPrice(meal.price)
        setImage(meal.image || "")
    }

    const save = () => {
        db.Meals.update({ id, type, price, image })
        setMeals(db.Meals.findAll())
        setId("")
        setType("")
        setPrice(0)
        setImage("")
    }

    const remove = id => {
        db.Meals.remove(id)
        setMeals(db.Meals.findAll())
    }

    const create = () => {
        db.Meals.create({ id, type, price, image })
        setMeals(db.Meals.findAll())
        setId("")
        setType("")
        setPrice(0)
        setImage("")
    }

    const validateCreate = () =>
        id.length > 0 &&
        type.length > 0 &&
        image.length > 0 &&
        price >= 0 &&
        undefined === db.Meals.findOne(id)

    const validateEdit = () =>
        id.length > 0 &&
        type.length > 0 &&
        image.length > 0 &&dsnk
        price >= 0 &&
        undefined !== db.Meals.findOne(id)

    const select = meal => {
        setSelected(meal)
    }

    const total = meals.reduce((sum, meal) => sum + meal.price, 0)

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Meals:
                    </Typography>
                </CardContent>
            </Card>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Image URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField id="Id" label="Id" value={id} onChange={event => setId(event.target.value)} />
                            </TableCell>
                            <TableCell>
                                <TextField id="Type" label="Type" value={type} onChange={event => setType(event.target.value)} />
                            </TableCell>
                            <TableCell>
                                <TextField id="Price" label="Price" value={price} onChange={event => setPrice(1 * event.target.value)} />
                            </TableCell>
                            <TableCell>
                                <TextField id="Image" label="Image URL" value={image} onChange={event => setImage(event.target.value)} />
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={create} disabled={!validateCreate()}>
                                    Add new Meal
                                </Button>
                                &nbsp;
                                <Button variant="contained" color="primary" onClick={save} disabled={!validateEdit()}>
                                    Save
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <GridList style={{ justifyContent: 'space-around' }} cols={3}>
                {
                    meals.map(
                        meal =>
                            <Meal
                                key={meal.id}
                                meal={meal}
                                edit={edit}
                                remove={remove}
                                select={select}
                                {...meal} />
                    )
                }
            </GridList>


            
            <Typography>{`Total Price: ${total}`}</Typography>
            {
                selected
                    ?
                    <MealAndDishes
                        meal={selected}
                        {...selected}
                    />
                    :
                    null
            }
        </>
    );
}

export default Meals;
