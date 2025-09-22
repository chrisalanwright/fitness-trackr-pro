import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { deleteRoutine, getRoutine } from "../api/routines";
import { useEffect, useState } from "react";

export default function RoutineDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const syncRoutine = async () => {
    const data = await getRoutine(id);
    setRoutine(data);
  };

  useEffect(() => {
    syncRoutine();
  }, [id]);

  const tryDelete = async () => {
    try {
      await deleteRoutine(token, id);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!routine) return <p>Error</p>;

  return (
    <>
      <h1>{routine.name}</h1>
      <p>by {routine.creatorName}</p>
      <p>{routine.goal}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}

      <SetList sets={routine.sets} syncRoutine={syncRoutine} />
      {token && <SetForm routineId={id} syncRoutine={syncRoutine} />}
    </>
  );
}
