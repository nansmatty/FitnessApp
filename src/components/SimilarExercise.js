import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import HorizontalScrollBar from './HorizontalScrollBar';
import Loader from './Loader';

const SimilarExercise = ({ targetMuscleExercises, equipmentExercises }) => {
	return (
		<Box sx={{ mt: { lg: '100px', xs: '0' } }}>
			<Typography variant='h3' mb={5}>
				Similar exercise that target the same muscle group
			</Typography>
			<Stack
				direction='row'
				sx={{ p: '2', position: 'relative', mb: { lg: '100px', xs: '40px' } }}>
				{targetMuscleExercises.length ? (
					<HorizontalScrollBar data={targetMuscleExercises} />
				) : (
					<Loader />
				)}
			</Stack>
			<Typography variant='h3' mb={5}>
				Similar exercise that use the same equiment
			</Typography>
			<Stack direction='row' sx={{ p: '2', position: 'relative' }}>
				{equipmentExercises.length ? (
					<HorizontalScrollBar data={equipmentExercises} />
				) : (
					<Loader />
				)}
			</Stack>
		</Box>
	);
};

export default SimilarExercise;
