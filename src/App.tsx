import { Grid, Paper, Stack } from "@mui/material";
import {
  blue,
  deepOrange,
  grey,
} from "@mui/material/colors";
import { useCallback, useEffect, useState } from "react";
import { AttributionBlog } from "./components/blogs/AttributionBlog";
import { FormulaBlog } from "./components/blogs/FormulaBlog";
import { PropertyBlog } from "./components/blogs/PropertyBlog";
import { ResultDisplay } from "./components/data-display/ResultDisplay";
import { CalculatorForm } from "./components/form/CalculatorForm";
import { useDesmosGraph } from "./hooks/useDesmosGraph";
import { formatCoord } from "./hooks/useRotationGroup";
import type { Vec2D } from "./types";

export const App = () => {
  const { desmosRef, makePoint, makeCircle, makePolygon } =
    useDesmosGraph("#desmos-graph");
  const [result, setResult] = useState<
    | {
        center: Vec2D<number>;
        result: {
          id: number;
          preimage: Vec2D<number>;
          image: Vec2D<number>;
        }[];
        angle: number;
        direction: number;
      }
    | undefined
  >();

  useEffect(() => {
    if (desmosRef.current === undefined) {
      return;
    }
    if (result === undefined) {
      return;
    }

    const centerCoord = formatCoord(result.center);

    makePoint("O", centerCoord, grey["A700"], "O");

    const imgCoords: string[] = [];
    const preimgCoords: string[] = [];
    for (const { id, image, preimage } of result.result) {
      const preimgCoord = formatCoord(preimage);
      preimgCoords.push(preimgCoord);
      makePoint(
        `A_{${id}}`,
        preimgCoord,
        blue["A400"],
        `A_{${id}}`
      );

      const imgCoord = formatCoord(image);
      imgCoords.push(imgCoord);
      makePoint(
        `A_{${id}}^{\\prime}`,
        imgCoord,
        deepOrange["A700"],
        `B_{${id}}`
      );
      makeCircle("O", `A_{${id}}`, grey["A700"]);
    }
    if (preimgCoords.length >= 3) {
      makePolygon(preimgCoords, blue["A200"]);
      makePolygon(imgCoords, deepOrange["A400"]);
    }
  }, [
    desmosRef,
    makeCircle,
    makePoint,
    makePolygon,
    result,
  ]);

  const handleSolve = useCallback(
    (result_: typeof result) => {
      desmosRef.current?.removeExpressions(
        desmosRef.current
          .getExpressions()
          .filter(({ id }) => id !== undefined)
          .map(({ id }) => ({ id: id! }))
      );
      setResult(result_);
    },
    [desmosRef]
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: 2, height: { md: "100vh" } }}
    >
      <Grid
        size={{ md: 4 }}
        sx={{
          maxHeight: { md: "100%" },
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            padding: 2,
            flexDirection: "column",
            gap: 1,
            display: "flex",
            height: { md: "100%" },
            maxHeight: { md: "100%" },
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <CalculatorForm onSubmit={handleSolve} />
          <ResultDisplay data={result} />
          <PropertyBlog />
          <FormulaBlog />
          <AttributionBlog />
        </Paper>
      </Grid>
      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{
          height: { xs: "50vh", md: "100%" },
        }}
      >
        <Stack
          spacing={1}
          sx={{ height: "100%" }}
        >
          <Paper
            variant="outlined"
            sx={{
              height: "100%",
            }}
          >
            <div
              id="desmos-graph"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
};
