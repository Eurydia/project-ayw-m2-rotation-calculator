import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import {
  memo,
  useCallback,
  useState,
  type FC,
} from "react";

const FORMULAE = [
  `$A(x,y)$ หมุนตามเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(y,-x)$$`,
  `$A(x,y)$ หมุนทวนเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(-y,x)$$`,
  `$A(x,y)$ หมุนตามหรือทวนเข็มนาฬิกา $180^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(-x,-y)$$`,
  `$A(x,y)$ หมุนตามเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(-y,x)$$`,
  `$A(x,y)$ หมุนทวนเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(y,-x)$$`,

  `$A(x,y)$ หมุนตามเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(a-b+y, b+a-x)$$`,
  `$A(x,y)$ หมุนทวนเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(a+b-y, b-a+x)$$`,
  `$A(x,y)$ หมุนตามหรือทวนเข็มนาฬิกา $180^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(2a-x,2b-y)$$`,
  `$A(x,y)$ หมุนตามเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(a+b-y, b-a+x)$$`,
  `$A(x,y)$ หมุนทวนเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(a-b+y, b+a-x)$$`,
] as const;

export const FormulaBlog: FC = memo(() => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(
    () => setOpen((prev) => !prev),
    []
  );

  return (
    <Stack spacing={0.5}>
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          component="div"
        >
          {`สูตรการหมุน`}
        </Typography>
        <Typography
          onClick={handleToggle}
          sx={{
            "&:hover": {
              textDecorationLine: "underline",
            },
          }}
        >
          {open ? `(ซ่อน)` : `(แสดง)`}
        </Typography>
      </Stack>
      <Collapse in={open}>
        <List
          sx={{
            paddingLeft: 4,
            listStyleType: "disc",
          }}
        >
          {FORMULAE.map((eq, index) => {
            return (
              <ListItem
                key={`eq-${index}`}
                sx={{ display: "list-item" }}
              >
                <ListItemText
                  slotProps={{
                    primary: { variant: "body1" },
                  }}
                >
                  <MathJax dynamic>{eq}</MathJax>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </Stack>
  );
});
