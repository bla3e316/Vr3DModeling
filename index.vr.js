import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    Model,
    Animated
} from 'react-vr';

import {Easing } from 'react-native';

export default class Vr3DModeling extends React.Component {
    constructor() {
        super();
        this.state = {spin: new Animated.Value(0)};
    }

    componentDidMount() {
        this.spinAnimation();

        // Animated.timing(
        //     this.state.spin,
        //     {
        //         toValue: 1,
        //         duration: 20000,
        //         easing: Easing.ease
        //     }
        // ).start();
    }
    spinAnimation() {
        this.state.spin.setValue(0);
        Animated.timing(
            this.state.spin,
            {
                toValue: 1,
                duration: 12000,
                easing: Easing.linear
            }
        ).start(() => this.spinAnimation());

    }

    render() {
        const spin = this.state.spin.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        const  AnimatedModel = Animated.createAnimatedComponent(Model);

        return (
            <View>
                <Pano source={asset('space.jpg')}/>
                <AnimatedModel
                    source={{
                        obj: asset('death-star.obj'),
                        //mtl: asset('death-star.mtl'),
                        //texture: asset("death-star.png")
                    }}
                    style={{
                        //transform: [{translate: [13, -15, -15]}]
                        transform: [
                            {translate: [0.5, -0.5, -1]},
                            {rotateY: spin}
                        ]
                    }}
                    texture={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/827672/death-star.png"}
                    wireframe={false}
                />
            </View>
        );
    }
};

AppRegistry.registerComponent('Vr3DModeling', () => Vr3DModeling);
