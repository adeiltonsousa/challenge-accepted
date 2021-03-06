import React, { useEffect } from "react";
import { WiRaindrop, WiUmbrella } from "react-icons/wi";
import { GrLinkUp, GrLinkDown } from "react-icons/gr";
import { useSelectCity } from "../../store/CitySelect";
import { useDataWeather } from "../../store/DataWeather";

import formatData from "../../utils/formatData";

import api from "../../services/api";

import { Container, Header, Main, ItemInfo, Card } from "./styles";

function CardInfo() {
  const { dataWeather, setDataWeather } = useDataWeather([]);
  const { citySelect } = useSelectCity("");

  useEffect(() => {
    const loadDataWeather = () => {
      api
        .get(`weather/city/${citySelect}`)
        .then((response) => setDataWeather(response.data.weather))
        .catch((e) => {
          console.log(e);
        });
    };
    loadDataWeather();
  }, [citySelect, setDataWeather]);

  return (
    <>
      <Container>
        {dataWeather.map((item) => (
          <Card key={item.date}>
            <Header>
              <span>{formatData(item.date)}</span>
              <p>{item.text}</p>
            </Header>
            <Main>
              <span>
                <ItemInfo>
                  <GrLinkUp size="20" color="#24243e" />
                  <span style={{ color: "#3a00ab" }}>
                    {item.temperature.max} °C
                  </span>
                </ItemInfo>
                <ItemInfo>
                  <GrLinkDown size="20" color="#24243e" />
                  <span style={{ color: "#e54f4f" }}>
                    {item.temperature.min} °C
                  </span>
                </ItemInfo>
              </span>
              <span>
                <ItemInfo>
                  <WiRaindrop size="30" color="#24243e" />
                  <span>{item.rain.precipitation} mm</span>
                </ItemInfo>
                <ItemInfo>
                  <WiUmbrella size="30" color="#24243e" />
                  <span>{item.rain.probability} %</span>
                </ItemInfo>
              </span>
            </Main>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default CardInfo;
