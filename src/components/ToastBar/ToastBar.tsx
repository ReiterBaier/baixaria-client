import { Snackbar, Slide, SlideProps, SnackbarContent } from "@mui/material"
import { BaixariaPallete } from "../../helpers/types";

type Props = {
    snackbarOpen: boolean,
    handleSnackbarClose: () => void,
    message: string | undefined,
    type: 'success' | 'error' | undefined,
    durationTime?: number
}

function slideTransition(props: SlideProps) {
    return <Slide {...props} timeout={500} direction="left" />;
}

export default function ToastBar({ message, snackbarOpen, handleSnackbarClose, type, durationTime}: Props) {

    const successStyle = {
        background: 'linear-gradient(to top left, #45814F, #7ABC85, #5D9767)',
        color: BaixariaPallete.PrimaryText,
        borderRadius: 2,
    };

    const errorStyle = {
        background: 'linear-gradient(to top left, #A40404, #C22A2A, #C91212)',
        color: BaixariaPallete.PrimaryText,
        borderRadius: 2,
    };

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={durationTime ?? 6000}
            onClose={handleSnackbarClose}
            sx={{ zIndex: 15000 }}
            TransitionComponent={slideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            ContentProps={{
                sx: type === 'error' ? errorStyle : successStyle,
            }}
        >
            <SnackbarContent 
                message={message} 
                sx={{ 
                    ... (type === 'error' ? errorStyle : successStyle)
                }}
            />
        </Snackbar>
    )
}
