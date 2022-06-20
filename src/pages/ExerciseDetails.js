import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideo from '../components/ExerciseVideo';
import SimilarExercise from '../components/SimilarExercise';

const ExerciseDetails = () => {
	const [exerciseDetail, setExerciseDetail] = useState({});
	const [exerciseVideos, setexerciseVideos] = useState([]);
	const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
	const [equipmentExercises, setEquipmentExercises] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		const fetchExerciseData = async () => {
			const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
			const youtubeSearchedUrl =
				'https://youtube-search-and-download.p.rapidapi.com';

			const exerciseDetailData = await fetchData(
				`${exerciseDbUrl}/exercises/exercise/${id}`,
				exerciseOptions
			);
			setExerciseDetail(exerciseDetailData);

			const exerciseVideoData = await fetchData(
				`${youtubeSearchedUrl}/search?query=${exerciseDetailData.name}`,
				youtubeOptions
			);
			setexerciseVideos(exerciseVideoData.contents);

			const targetExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
				exerciseOptions
			);
			setTargetMuscleExercises(targetExercisesData);

			const equipmentExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
				exerciseOptions
			);
			setEquipmentExercises(equipmentExercisesData);
		};

		fetchExerciseData();
	}, [id]);

	return (
		<Box>
			<Detail exerciseDetail={exerciseDetail} />
			<ExerciseVideo
				exerciseVideos={exerciseVideos}
				name={exerciseDetail.name}
			/>
			<SimilarExercise
				targetMuscleExercises={targetMuscleExercises}
				equipmentExercises={equipmentExercises}
			/>
		</Box>
	);
};

export default ExerciseDetails;
