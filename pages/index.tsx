import { NextPage } from "next"
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { EntryList, Layout, NewEntry } from "@/components";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes"></CardHeader>
            <NewEntry/>
            <EntryList status="pending"/>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso"></CardHeader>
            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas"></CardHeader>
            <EntryList status="finished"/>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage;