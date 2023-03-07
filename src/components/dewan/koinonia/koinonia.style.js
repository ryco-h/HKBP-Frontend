import { makeStyles } from "@mui/styles";

export const useKoinoniaStyles = makeStyles({
    root: {
        // backgroundColor: 'red'
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
    },
    tagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%'
    },
    tagsContainerMobile: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
})