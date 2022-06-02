import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  useMediaQuery,
  DialogTitle,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * TypeScript에서 타입을 갖다 쓰는데, 특정 타입은 제외하고 싶은 경우
 * => Omit을 쓴다!
 * 참고: https://stackoverflow.com/questions/48215950/exclude-property-from-type
 */
type DialogPropsWithoutOpen = Omit<DialogProps, 'open'>;

function useScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  function ScrollDialog(props: DialogPropsWithoutOpen) {
    return (
      <div>
        <Dialog
          {...props}
          open={open}
          onClose={handleClose}
          maxWidth="lg"
          fullScreen={fullScreen}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          {/* <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle> */}
          <DialogContent dividers>{props.children}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return { ScrollDialog, handleClickOpen };
}

export default useScrollDialog;
