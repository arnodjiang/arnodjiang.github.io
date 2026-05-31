import { Box, VStack, Text, useColorModeValue, Image, HStack, Container, Stack, Link, Flex, SimpleGrid, Heading, Tooltip } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { withBase } from '@/utils/asset'
import DynamicIcon from '../DynamicIcon'
import { siteOwner, siteConfig, heroSocialIcons } from '@/site.config'

const MotionBox = motion(Box)
const MotionText = motion(Text)

interface ResearchItem {
  lab: string
  emoji: string
  advisor?: string
  focus: string
  link: string
}

interface EducationItem {
  course: string
  institution: string
  year: string
}

// Hero Section Component
interface HeroSectionProps {
  title: string
  avatar: string
  research?: ResearchItem[]
  researchLogos?: Record<string, string>
  education?: EducationItem[]
  educationLogos?: Record<string, string>
}

const HeroSection = ({ title, avatar, research = [], researchLogos = {}, education = [], educationLogos = {} }: HeroSectionProps) => {
  const headingColor = useColorModeValue('gray.800', 'white')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const bg = useColorModeValue('gray.50', 'gray.900')
  const accentBg = useColorModeValue('blue.50', 'blue.900')

  return (
    <Box
      w="full"
      bg={bg}
      py={[3, 4, 6]}
      mt={[2, 3, 4]}
    >
      <Container maxW={["full", "full", "7xl"]} px={[2, 4, 8]}>
        <Stack
          direction={['column', 'column', 'row']}
          spacing={[3, 4, 6]}
          align="center"
          justify="space-between"
        >
          <VStack spacing={[2, 3]} align={['center', 'center', 'flex-start']} flex="1">
            <MotionText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              as="h1"
              fontSize={["2xl", "3xl", "4xl"]}
              fontWeight="bold"
              color={headingColor}
              lineHeight="shorter"
              mb={[1, 2, 3]}
              textAlign={["center", "center", "left"]}
              w="full"
              fontFamily="mono"
            >
              <MotionText
                as="span"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                color="cyan.400"
                display="inline-block"
              >
                {siteOwner.name.display}
              </MotionText>
            </MotionText>

            <Box w="full" borderTop="1px dashed" borderColor={useColorModeValue('gray.200', 'gray.700')} />

            {/* Research & Education compact section */}
            {(research.length > 0 || education.length > 0) && (
              <SimpleGrid columns={[1, 1, 2]} spacing={[3, 3, 4]} w="full">
                {research.length > 0 && (
                  <VStack align="start" spacing={2}>
                    <Heading size="xs" color={textColor} textTransform="uppercase" letterSpacing="wider" fontSize="2xs">
                      Current Research
                    </Heading>
                    {research.map((item, index) => {
                      const logo = researchLogos[item.lab]
                      return (
                        <Link key={index} href={item.link} isExternal _hover={{ textDecoration: 'none' }} w="full">
                          <HStack spacing={2.5} p={2} borderRadius="md" transition="all 0.2s" _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}>
                            {logo ? (
                              <Image src={logo} alt={item.lab} w="28px" h="28px" borderRadius="sm" objectFit="contain" flexShrink={0} />
                            ) : (
                              <Flex w="28px" h="28px" borderRadius="sm" bg={accentBg} align="center" justify="center" flexShrink={0}>
                                <Text fontSize="sm">{item.emoji}</Text>
                              </Flex>
                            )}
                            <VStack align="start" spacing={0} flex={1}>
                              <Text fontSize={["xs", "sm"]} fontWeight="medium" lineHeight="short" color={headingColor}>{item.lab}</Text>
                              <Text fontSize="2xs" color={textColor} lineHeight="short" noOfLines={1}>
                                {item.advisor ? `w/ ${item.advisor}` : item.focus}
                              </Text>
                            </VStack>
                          </HStack>
                        </Link>
                      )
                    })}
                  </VStack>
                )}
                {education.length > 0 && (
                  <VStack align="start" spacing={2}>
                    <Heading size="xs" color={textColor} textTransform="uppercase" letterSpacing="wider" fontSize="2xs">
                      Education
                    </Heading>
                    {education.map((item, index) => {
                      const logo = educationLogos[item.institution]
                      return (
                        <HStack key={index} spacing={2.5} p={2} borderRadius="md" w="full">
                          {logo ? (
                            <Image src={logo} alt={item.institution} w="28px" h="28px" borderRadius="sm" objectFit="contain" flexShrink={0} />
                          ) : (
                            <Flex w="28px" h="28px" borderRadius="sm" bg={accentBg} align="center" justify="center" flexShrink={0}>
                              <Text fontSize="sm" fontWeight="bold" color="blue.500">{item.institution.charAt(0)}</Text>
                            </Flex>
                          )}
                          <VStack align="start" spacing={0} flex={1}>
                            <Text fontSize={["xs", "sm"]} fontWeight="medium" lineHeight="short" color={headingColor}>{item.course}</Text>
                            <Text fontSize="2xs" color={textColor} lineHeight="short">{item.institution} · {item.year}</Text>
                          </VStack>
                        </HStack>
                      )
                    })}
                  </VStack>
                )}
              </SimpleGrid>
            )}

            <Box w="full" borderTop="1px dashed" borderColor={useColorModeValue('gray.200', 'gray.700')} />

            <Text
              w="full"
              fontSize={["sm", "md"]}
              color={textColor}
              fontFamily="mono"
              textAlign={["center", "center", "left"]}
            >
              {title}
            </Text>
          </VStack>
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={[2, 3]}>
              <Image
                src={withBase(`images/${avatar}`)}
                alt={title}
                borderRadius="xl"
                boxSize={["150px", "180px", "220px"]}
                objectFit="cover"
              />
              {/* Social icons row below avatar */}
              <HStack spacing={[1, 1.5]} justify="center">
                {heroSocialIcons.map((item) => (
                  <Tooltip key={item.label} label={item.label} fontSize="xs" hasArrow placement="bottom" openDelay={200} fontFamily="mono">
                    <Link href={item.href} isExternal _hover={{ textDecoration: 'none' }}>
                      <Box
                        p={1.5}
                        cursor="pointer"
                        color={useColorModeValue('gray.400', 'gray.500')}
                        transition="all 0.2s"
                        _hover={{ color: item.color, transform: 'scale(1.2)' }}
                      >
                        <DynamicIcon name={item.icon} boxSize={[3, 3.5]} />
                      </Box>
                    </Link>
                  </Tooltip>
                ))}
              </HStack>
              {(siteConfig.pets as { name: string; emoji: string; image: string }[]).length > 0 && (
                <HStack spacing={[4, 5]} justify="center">
                  {(siteConfig.pets as { name: string; emoji: string; image: string }[]).map((pet) => (
                    <VStack key={pet.name} spacing={2}>
                      {pet.image && (
                        <Image
                          src={pet.image}
                          alt={pet.name}
                          borderRadius="full"
                          boxSize={["40px", "50px"]}
                          objectFit="cover"
                        />
                      )}
                      <Text fontSize="sm" fontWeight="medium">{pet.name} {pet.emoji}</Text>
                    </VStack>
                  ))}
                </HStack>
              )}
            </VStack>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  )
}

export default HeroSection
