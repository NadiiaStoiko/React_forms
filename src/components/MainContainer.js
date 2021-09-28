import {Container} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles=makeStyles((theme)=>(
    {
        root:
        {
        marginTop:theme.spacing(4),
        display:'flex',
        flexDirection:'column',
        alignItems:'center'    
        }
    }
))

export const MainContainer=({children,...props})=>{
    const styles=useStyles();
    return(
    <Container className={styles.root} component='main'maxWidth='xs'{...props}>
        {children}
    </Container>
    )
}