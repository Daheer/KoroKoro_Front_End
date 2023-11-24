import React, { Suspense } from "react";
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Canvas3D from "../components/Canvas3D";
import CartCounter from "../components/CartCounter"
import { getProductByID } from "../services/dataOps";
import { saveObj, getObjFileParts, downloadFile } from "../services/downloadOps";

async function prepareObjFile(unique_id, obj_file_parts) {
  const fs = require('fs');
  if (fs.existsSync(`public/${unique_id}/mesh.obj`) && fs.statSync(`public/${unique_id}/mesh.obj`).size > 0) {
    return `/${unique_id}/mesh.obj`;
  }
  else {
    const total_data = []
    for (const part of obj_file_parts) {
      const data = await downloadFile(unique_id, part);
      if (data) {
        total_data.push(data)
        total_data.push('\n')
      }
    }
    const obj_blob = new Blob(total_data, { type: 'text/plain' });
    saveObj(unique_id, obj_blob);
    return `/${unique_id}/mesh.obj`;
  }
}

export default async function ProductCard({ unique_id }) {
  const params = await getProductByID(unique_id);
  let objectReady = false;
  let obj_file = '';

  if (params.status === 'DONE') {
    objectReady = true;
    const obj_file_parts = await getObjFileParts(unique_id);
    obj_file = await prepareObjFile(unique_id, obj_file_parts)
  }

  return (
    <div>
      <Grid container columns={12} spacing={2} sx={{ margin: "5rem" }}>
        <Grid xs={12} md={8} lg={6}>
          <Suspense fallback={
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', fontSize: '2rem' }}>Loading 3D object...</div>
              <Skeleton variant="rounded" animation="wave" height={300} />
            </div>
          }>
            <div
              style={{
                height: "70vh",
                borderRadius: "2rem",
                border: "none",
                boxShadow: '0 0 0.05rem 0.1rem rgba(0, 0, 0, 0.4)',
              }}
            >
              {
                objectReady ? (
                  <Canvas3D obj_file={obj_file} />
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    height: '100%',
                  }}>
                    3D object not ready...
                    <img
                      src="/loading3d.gif"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                )
              }
            </div>
          </Suspense>
        </Grid>
        <Grid xs={12} md={4} lg={6}>
          <Card
            sx={{
              padding: "0.1rem",
              borderRadius: "2rem",
              transition: "box-shadow 0.3s",
              marginTop: "auto",
              "&:hover": {
                boxShadow: "0 0.2rem 0.4rem rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <CardContent>
              <p
                style={{
                  color: "black",
                  fontSize: "2.5rem",
                  marginBottom: "-2rem",
                }}
              >
                {params.name}
              </p>
              <br />
              <p
                style={{
                  color: "black",
                  fontSize: "1rem",
                  opacity: "0.5",
                }}
              >
                {params.category.toUpperCase()}
              </p>

              <br />
              <p
                style={{
                  color: "black",
                  fontSize: "2rem",
                }}
              >
                ₦{params.price.toLocaleString('en-US')}
              </p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CartCounter
                  id={params.unique_id}
                  quantity={1}
                />
                <Button variant="outlined" sx={{ color: 'black', border: 'none', boxShadow: '0 0 0.05rem 0.1rem rgba(0, 0, 0, 0.4)' }}>
                  BUY
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div >
  );
}
