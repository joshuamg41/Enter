import moment from 'moment';
import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, METRICS} from '../../../themes';
import RenderRow from '../../../components/render/row/RenderRow';
import QRCode from 'react-native-qrcode-svg';
import CheckRender from '../../../components/security/CheckRender';
import Text from '../../../components/text/Text';
import Container from '../../../components/container/Container';

const VisitListItem: FunctionComponent<propTypes> = props => {
  console.log(props.item);
  return (
    <View>
      <CheckRender allowed={props.userRole === 'Admin'}>
        <Container style={Styles.container}>
          <View style={Styles.card}>
            <View style={Styles.since}>
              <Text style={Styles.titleText}>
                Desde: {props.item.final.substr(0, 10)}
              </Text>
              <Text style={Styles.titleText}>
                Hasta: {props.item.final.substr(0, 10)}{' '}
              </Text>
            </View>
            <View style={Styles.body}>
              <View style={Styles.content}>
                <View>
                  <Text style={Styles.titleText}>Visitante</Text>
                  <Text style={Styles.itemTitle}>{props.item.name}</Text>
                  <Text style={Styles.itemTitle}>{props.item.email}</Text>
                  <Text style={Styles.itemTitle}>
                    Compañia: {props.item.company}
                  </Text>
                  <Text style={Styles.itemTitle}>
                    Posicion: {props.item.position}
                  </Text>
                </View>
                <View style={Styles.proyect}>
                  <Text style={Styles.titleText}>Proyecto</Text>
                  <Text style={Styles.itemTitle}>
                    {props.item.proyecto.name}
                  </Text>
                  <Text style={[Styles.itemTitle, {width: 100}]}>
                    {props.item.proyecto.description}
                  </Text>
                </View>
              </View>
              <View>
                <QRCode value={props.item.id} size={50} />
              </View>
            </View>
          </View>
        </Container>
      </CheckRender>
      <CheckRender allowed={props.projectId === props.item.projectID}>
        <Container style={Styles.container}>
          <View style={Styles.card}>
            <View style={Styles.since}>
              <Text style={Styles.titleText}>
                Desde: {props.item.final.substr(0, 10)}
              </Text>
              <Text style={Styles.titleText}>
                Hasta: {props.item.final.substr(0, 10)}{' '}
              </Text>
            </View>
            <View style={Styles.body}>
              <View style={Styles.content}>
                <View>
                  <Text style={Styles.titleText}>Visitante</Text>
                  <Text style={Styles.itemTitle}>{props.item.name}</Text>
                  <Text style={Styles.itemTitle}>{props.item.email}</Text>
                  <Text style={Styles.itemTitle}>
                    Compañia: {props.item.company}
                  </Text>
                  <Text style={Styles.itemTitle}>
                    Posicion: {props.item.position}
                  </Text>
                </View>
                <View style={Styles.proyect}>
                  <Text style={Styles.titleText}>Proyecto</Text>
                  <Text style={Styles.itemTitle}>
                    {props.item.proyecto.name}
                  </Text>
                  <Text style={[Styles.itemTitle, {width: 150}]}>
                    {props.item.proyecto.description}
                  </Text>
                </View>
              </View>
              <View>
                <QRCode value={props.item.id} size={50} />
              </View>
            </View>
          </View>
        </Container>
      </CheckRender>
    </View>
  );
};
interface propTypes {
  projectId: string;
  index: number;
  userRole: string | undefined;
  item: {
    projectID: string;
    id: string;
    name: string;
    email: string;
    company: string;
    final: string;
    start: string;
    status: string;
    position: string;
    proyecto: {
      id: string;
      description: string;
      name: string;
    };
  };
}

VisitListItem.defaultProps = {};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.lightGray,
    width: '95%',
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    paddingRight: 2,
    justifyContent: 'space-between',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  since: {
    marginBottom: 10,
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  proyect: {
    paddingLeft: 15,
  },
  itemTitle: {
    fontSize: 13,
    color: COLORS.black,
  },
});

export default VisitListItem;
