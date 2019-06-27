import React from 'react';
import { Dropdown } from '@entrylabs/tool/component';
import ThemeSelector from '../../helper/themeSelector';

const Wrapper = ThemeSelector.getThemeComponent<'div'>('header.dropdownButton.wrapper');
const AnchorButton = ThemeSelector.getThemeComponent<'a', any>('header.dropdownButton.anchor');

type DropdownItemTuple = [string, string];

interface IProps {
    icon: string;
    title?: string;
    items: DropdownItemTuple[];
    onSelect: ([key, value]: DropdownItemTuple) => void;
    animate?: boolean;
    style?: React.CSSProperties
}

interface IState {
    on: boolean;
}

class DropdownIconButton extends React.Component<IProps, IState> {
    dom: React.RefObject<HTMLAnchorElement>;

    constructor(props: Readonly<IProps>) {
        super(props);
        this.dom = React.createRef();
        this.state = {
            on: false,
        };
    }

    makeDropdown() {
        if (!this.state.on) {
            return null;
        }
        const { animate = false, items = [] } = this.props;
        return (
            <Dropdown
                autoWidth
                animation={animate}
                items={items}
                positionDom={this.dom.current}
                onSelectDropdown={(item: any) => {
                    this.setState(
                        {
                            on: !this.state.on,
                        },
                        () => {
                            this.props.onSelect(item);
                        },
                    );
                }}
                outsideExcludeDom={[this.dom.current]}
                onOutsideClick={() => {
                    this.setState(
                        {
                            on: !this.state.on,
                        },
                    );
                }}
            />
        );
    }

    clickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        this.setState(
            {
                on: !this.state.on,
            },
        );
    };

    render() {
        return (
            <Wrapper>
                <AnchorButton
                    title={this.props.title}
                    ref={this.dom}
                    onClick={this.clickHandler}
                    on={this.state.on}
                    icon={this.props.icon}
                    style={this.props.style}
                />
                {this.makeDropdown()}
            </Wrapper>
        );
    }
}

export default DropdownIconButton;
