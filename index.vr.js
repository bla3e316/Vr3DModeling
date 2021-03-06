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
                duration: 24000,
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
                        obj: asset('starwars-tie-fighter.obj'),
                        mtl: asset('starwars-tie-fighter.mtl'),
                    }}
                    style={{
                        transform: [
                            {translate: [13, -5, -5]},
                            {rotateY: spin}
                        ]
                    }}
                    wireframe={true}
                    lit={false}
                />
                <AnimatedModel
                    source={{
                        obj: asset('star-wars-arc-170-pbr.obj'),
                        mtl: asset('star-wars-arc-170-pbr.mtl'),
                    }}
                    style={{
                        transform: [
                            {translate: [-20, -10, -15]},
                            {rotateY: spin}
                        ]
                    }}
                    wireframe={false}
                    lit={false}
                />
            </View>
        );
    }
};

AppRegistry.registerComponent('Vr3DModeling', () => Vr3DModeling);
