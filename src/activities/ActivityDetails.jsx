import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity, getActivity } from "../api/activities";
import { useEffect, useState } from "react";

export default function ActivityDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncActivity = async () => {
      const data = await getActivity(id);
      setActivity(data);
    };
    syncActivity();
  }, [id]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      navigate("/activities");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      {!activity ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{activity.name}</h1>
          <p>by {activity.creatorName}</p>
          <p>{activity.description}</p>
          {token && <button onClick={tryDelete}>Delete</button>}
          {error && <p role="alert">{error}</p>}
        </>
      )}
    </article>
  );
}
