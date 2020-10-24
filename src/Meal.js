import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import db from './db'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

function Meal({ meal, edit, remove, select, id, type, price, image }) {

    const [dishes, setDishes] = useState([])

    useEffect(() => {
        const getData = async () => {
            setDishes(await db.Dishes.findByMealId(id))
        }
        getData()
    }, [id])
    
    return (
        <Card key={id}>
            <CardActionArea>
                <CardMedia
                    image={image || "https://image.shutterstock.com/image-photo/british-shorthair-kitten-silver-color-260nw-1510641710.jpg"}
                    title="Contemplative Reptile"
                    style={{ height: 140 }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Id
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {id}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        Type
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {type}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        Price
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => edit(meal)}>
                    Edit
                </Button>
                <Button size="small" color="primary" onClick={() => remove(id)} disabled={dishes.length > 0}>
                    X
                </Button>
                <Button size="small" color="primary" component={Link} to={`/meals/${id}`}>
                    Select
                </Button>
            </CardActions>
        </Card>
    );
}

export default Meal;
