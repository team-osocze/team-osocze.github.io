import React from "react";
import Typography from "@material-ui/core/Typography";

export default function InfoBlock(){

   return (
    <>    
      <Typography variant="body1" gutterBottom>
      <p>
      Zgłaszając się musisz posiadać przy sobie:
        <div style={{ marginLeft: "15px" }}>
          <strong> • dokument ze zdjęciem potwierdzający tożsamość </strong>
          <br/> (dowód osobisty, legitymację studencką, prawo jazdy, paszport, legitymację Honorowego Dawcy Krwi),
          <br/> <strong> • numer PESEL. </strong>
        </div>
      </p>
      <p>Zwróć uwagę by przyjść:
        <div style={{ marginLeft: "15px" }}>
                • zdrowym,
          <br/> • wypoczętym i wyspanym,
          <br/> • po lekkostrawnym i niskokalorycznym posiłku,
          <br/> • po wypiciu około 1,5 litra płynów w ciągu 24 godzin przed oddaniem krwi,
          <br/> • nie wcześniej niż 24h po spożyciu alkoholu.
        </div>
      </p>
      </Typography>
    </>
  );
}
