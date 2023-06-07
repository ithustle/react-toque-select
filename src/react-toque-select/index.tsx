import { Box, ChakraProvider, Text, Divider, Flex, Stack, HStack } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons'
import { useState, useRef, PropsWithChildren } from 'react';

interface ReactToqueSelect {
    options: any[]
    isMulti?: boolean
    onSelectOption?: (value: string, index: number) => void
}

const multiSelected: string[] = []

export default function ReactToqueSelect(props: ReactToqueSelect) {

    const {
        options,
        isMulti = true,
        onSelectOption
    } = props;

    const [openList, setOpenList] = useState<boolean>(false)
    const [optionTextSelected, setOptionTextSelected] = useState<string>('')
    const [optionArrayTextSelected, setOptionArrayTextSelected] = useState<string[]>([])

    const boxRef = useRef<HTMLDivElement | null>(null);

    function onToggleOpenList() {
        setOpenList(!openList)
    }

    function onToggleSelectOption(value: string, index: number) {

        if (onSelectOption) {
            onSelectOption(value, index)
        }

        if (isMulti) {
            multiSelected.push(value)
            console.log(multiSelected)
            setOptionArrayTextSelected(multiSelected)
        } else {
            setOptionTextSelected(value)
        }

        setOpenList(false)
    }

    function onCollapseOptions() {
        console.log('oK')
    }

    return (
        <ChakraProvider>
            <Box
                ref={boxRef}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                p={'3'}
                bg={'#EDEDED'}
                borderRadius={'8'}
                boxShadow={'0px 1px 2px rgba(0, 0, 0, 0.25)'}
                onClick={onToggleOpenList}
                onBlur={onCollapseOptions}
                zIndex={100}
                onBlurCapture={onCollapseOptions}
            >
                <HStack

                >
                    {
                    /* optionTextSelected === '' ||  */optionArrayTextSelected.length === 0 ?
                            <Text
                                color={'#858585'}
                                px={'3'}
                            >
                                Selecione o que quiseres
                            </Text>
                            :
                            isMulti ?
                                optionArrayTextSelected.map((value, i) => (
                                    <CardText key={i}>
                                        {value}
                                    </CardText>
                                ))
                                :
                                <Text
                                    px={'3'}
                                >
                                    {'optionTextSelected'}
                                </Text>
                    }
                </HStack>
                <Flex
                    alignItems={'center'}
                    gap={4}
                >
                    <Divider
                        orientation='vertical'
                        width={'1px'}
                        height={'8'}
                        bg={'#9E9E9E'}
                    />
                    {
                        openList ?
                            <ChevronUpIcon boxSize={8} color={'#858585'} />
                            :
                            <ChevronDownIcon boxSize={8} color={'#858585'} />
                    }
                </Flex>
            </Box>
            {
                openList && (
                    <Stack
                        minH={'24'}
                        maxH={'64'}
                        bg={'#EBEBEB'}
                        mt={'2'}
                        overflow={'auto'}
                        borderRadius={'8'}
                        boxShadow={'0px 1px 2px rgba(0, 0, 0, 0.25)'}
                        justifyContent={options.length === 0 ? 'center' : 'normal'}
                    >
                        {
                            options.length === 0 ?
                                <Text
                                    color={'#858585'}
                                    textAlign={'center'}
                                >
                                    Nenhuma whatever you want
                                </Text>
                                :
                                options.map((value, index) => (
                                    <Box
                                        key={index}
                                        p={'4'}
                                        _hover={{
                                            bg: '#e5e5e5',
                                            cursor: 'pointer',
                                            borderRadius: 8
                                        }}
                                        onClick={() => onToggleSelectOption(value, index)}
                                    >
                                        <Text
                                            color={'#858585'}
                                            textAlign={'left'}
                                        >
                                            {value}
                                        </Text>
                                    </Box>
                                ))
                        }
                    </Stack>
                )
            }
        </ChakraProvider>
    );
}

function CardText(props: PropsWithChildren) {

    return (
        <Flex
            px={'3'}
            bg={'#ddd'}
            alignItems={'center'}
            gap={2}
            zIndex={10000}
        >
            <Box>
                {props.children}
            </Box>
            <CloseIcon 
                boxSize={2} 
                color={'#444'} 
            />
        </Flex>
    )
}