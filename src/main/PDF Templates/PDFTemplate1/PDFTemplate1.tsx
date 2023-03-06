import {FC, Fragment, memo} from "react";
import {Page, Text, View, Document, StyleSheet, Font, Link} from '@react-pdf/renderer';
import IranSanseL from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum)_Light.woff'
import IranSanseB from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum)_Bold.woff'
import IranSanseUL from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum)_UltraLight.woff'
import IranSanse from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum).woff'
import PersianText from "../PersianText/PersianText";
import Star from "./Star.jsx";
import {EducationItem} from "../../components/EducationForm/EducationForm";
import {JobExperienceItem} from "../../components/JobExperienceForm/JobExperienceForm";
import {CertificateItem} from "../../components/CertificateForm/CertificateForm";
import {LanguageItem} from "../../components/LanguageForm/LanguageForm";
import {SkillItem} from "../../components/SkillForm/SkillForm";
import {SocialMediaItem} from "../../components/SocialMediaForm/SocialMediaForm";
import {ProjectItem} from "../../components/ProjectForm/ProjectForm";
import {Resume} from "../PDFTemplate6/PDFTemplate6";
import {useParams} from "react-router-dom";
Font.register( {
  family: "IranSanse",
  fonts: [
    {src: IranSanseL, fontStyle: 'light'},
    {src: IranSanseUL, fontStyle: 'ultralight'},
    {src: IranSanseB, fontStyle: 'bold'},
    {src: IranSanse, fontStyle: 'normal'},
  ]
} );

const styles = StyleSheet.create( {
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  page: {
    padding: '22 30',
    fontFamily: 'IranSanse',
  },
  basicInfoView: {
    textAlign: 'center',
  },
  name: {
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  position: {
    fontFamily: 'IranSanse',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'normal',
  },
  info: {
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  address: {
    fontSize: 9,
    fontFamily: 'IranSanse',
    fontStyle: 'light',
    marginTop: 2,
  },
  contact: {
    fontSize: 10,
    fontFamily: 'IranSanse',
    fontStyle: 'normal',
  },
  title: {
    width: '20%',
  },
  description: {
    width: '80%',
  },
  itemWrapper: {
    width: '80%',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap'
  },
  item: {
    width: '50%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingLeft: 20
  },
  sectionViewWrapper: {
    paddingTop: 2,
    marginBottom: 2,
    borderTop: 1.5,
    borderColor: 'gray'
  },
  bioSectionView: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  sectionView: {
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  ratingStar: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  socialMediaItem: {
    width: '50%',
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end'
  },
  link: {
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  projectLink: {
    flexDirection: 'row-reverse',
    fontSize: 10
  }
} );

interface Props {
  resume: Resume
}

const PDFTemplate1: FC<Props> = ( {resume} ) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {resume.basicInformation &&
          <View style={styles.basicInfoView}>
            {( resume.basicInformation.lastName !== '' || resume.basicInformation.firstName !== '' ) &&
              <View style={styles.name}>
                {resume.basicInformation.firstName !== '' && <PersianText text={resume.basicInformation.firstName} fontStyle={"bold"} fontSize={19} marginTop={0} marginBottom={0} />}
                {resume.basicInformation.lastName !== '' && <PersianText text={resume.basicInformation.lastName} fontStyle={"bold"} fontSize={19} marginTop={0} marginBottom={0} />}
              </View>
            }
            {resume.basicInformation.jobTitle !== '' &&
              <View style={styles.info}>
                <PersianText text={resume.basicInformation.jobTitle} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
              </View>
            }
            <View style={styles.info}>
              {resume.basicInformation.birthDate !== '' && <PersianText text={`متولد: ${resume.basicInformation.birthDate}`} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.birthDate !== '' && resume.basicInformation.maritalStatus !== '' && <PersianText text={' ، '} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.maritalStatus !== '' && <PersianText text={`وضعیت تأهل: ${resume.basicInformation.maritalStatus}`} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.maritalStatus !== '' && resume.basicInformation.soldieringStatus !== '' && <PersianText text={' ، '} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.birthDate !== '' && resume.basicInformation.soldieringStatus !== '' && resume.basicInformation.maritalStatus === '' && <PersianText text={' ، '} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
              {resume.basicInformation.soldieringStatus !== '' && <PersianText text={`وضعیت سربازی: ${resume.basicInformation.soldieringStatus}`} fontStyle={"light"} fontSize={9} marginTop={4} marginBottom={0} />}
            </View>
            <View style={styles.info}>
              {resume.basicInformation.city !== '' && <PersianText text={resume.basicInformation.city} fontStyle={"light"} fontSize={9} marginTop={2} marginBottom={0} />}
              {resume.basicInformation.city !== '' && resume.basicInformation.address !== '' && <PersianText text={' - '} fontStyle={"light"} fontSize={9} marginTop={2} marginBottom={0} />}
              {resume.basicInformation.address !== '' && <PersianText text={`${resume.basicInformation.address}`} fontStyle={"light"} fontSize={9} marginTop={2} marginBottom={0} />}
            </View>
            <View style={styles.info}>
              {resume.basicInformation.email !== '' && <PersianText text={resume.basicInformation.email} fontStyle={"normal"} fontSize={10} marginTop={2} marginBottom={0} />}
              {resume.basicInformation.email !== '' && resume.basicInformation.mobileNumber !== '' && <PersianText text={' ، '} fontStyle={"normal"} fontSize={10} marginTop={2} marginBottom={0} />}
              {resume.basicInformation.mobileNumber !== '' && <PersianText text={`${resume.basicInformation.mobileNumber}`} fontStyle={"normal"} fontSize={10} marginTop={2} marginBottom={0} />}
            </View>
          </View>
        }
        <View>
          {
            resume.aboutMe && resume.aboutMe.description !== '' &&
            <View style={styles.sectionViewWrapper}>
              <View style={styles.bioSectionView}>
                <View style={styles.title}><PersianText text={"درباره من"} fontStyle={"bold"} fontSize={11} marginTop={0} marginBottom={0} /></View>
                <View style={styles.description}>
                  {resume.aboutMe.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"light"} fontSize={10} marginTop={2} marginBottom={0} /> )}
                </View>
              </View>
            </View>
          }
        </View>
        {resume.educationItem.length !== 0 &&
          resume.educationItem.map( ( educationItem: EducationItem, i: number ) => {
            return (
              <View key={i} wrap={false}>
                {i === 0 &&
                  <View style={styles.sectionViewWrapper}>
                    <PersianText text={"سوابق تحصیلی"} fontStyle={"bold"} fontSize={11} marginTop={0} marginBottom={0} />
                  </View>}
                <View style={styles.sectionView}>
                  <View style={styles.title}>
                    <PersianText text={`${educationItem.startDate}${educationItem.startDate && educationItem.endDate && ' - '}${educationItem.endDate}`} fontStyle={"ultralight"} fontSize={8} marginTop={6} marginBottom={0} />
                  </View>
                  <View style={styles.description}>
                    <PersianText text={`${educationItem.degree} ${educationItem.study}`} fontStyle={"normal"} fontSize={11} marginTop={0} marginBottom={0} />
                    <PersianText text={educationItem.university} fontStyle={"light"} fontSize={10} marginTop={4} marginBottom={0} />
                  </View>
                </View>
              </View>
            )
          } )
        }
        {resume.jobExperienceItem.length !== 0 &&
          resume.jobExperienceItem.map( ( jobExperienceItem: JobExperienceItem, i: number ) => {
            return (
              <View key={i} wrap={false}>
                {i === 0 &&
                  <View style={styles.sectionViewWrapper}>
                    <PersianText text={"سوابق شغلی"} fontStyle={"bold"} fontSize={11} marginTop={0} marginBottom={0} />
                  </View>}
                <View style={styles.sectionView}>
                  <View style={styles.title}>
                    <PersianText text={`${jobExperienceItem.startDate}${jobExperienceItem.startDate && jobExperienceItem.endDate && ' - '}${jobExperienceItem.endDate}`} fontStyle={"ultralight"} fontSize={8} marginTop={6} marginBottom={0} />
                  </View>
                  <View style={styles.description}>
                    <PersianText text={jobExperienceItem.jobPosition} fontStyle={"normal"} fontSize={11} marginTop={0} marginBottom={0} />
                    <PersianText text={jobExperienceItem.companyName} fontStyle={"light"} fontSize={10} marginTop={4} marginBottom={0} />
                  </View>
                </View>
              </View>
            )
          } )
        }
        {resume.certificateItem.length !== 0 &&
          resume.certificateItem.map( ( certificateItem: CertificateItem, i: number ) => {
            return (
              <View key={i} wrap={false}>
                {i === 0 &&
                  <View style={styles.sectionViewWrapper}>
                    <PersianText text={"دوره ها و گواهینامه ها"} fontStyle={"bold"} fontSize={11} marginTop={0} marginBottom={0} />
                  </View>}
                <View style={styles.sectionView}>
                  <View style={styles.title}>
                    <PersianText text={`${certificateItem.startDate}${certificateItem.startDate && certificateItem.endDate && ' - '}${certificateItem.endDate}`} fontStyle={"ultralight"} fontSize={8} marginTop={6} marginBottom={0} />
                  </View>
                  <View style={styles.description}>
                    <PersianText text={certificateItem.certificateName} fontStyle={"normal"} fontSize={11} marginTop={0} marginBottom={0} />
                    <PersianText text={certificateItem.institution} fontStyle={"light"} fontSize={10} marginTop={4} marginBottom={0} />
                  </View>
                </View>
              </View>
            )
          } )
        }
        {resume.languageItem.length !== 0 &&
          <View style={styles.sectionViewWrapper} wrap={false}>
            <View style={styles.bioSectionView}>
              <View style={styles.title}><PersianText text={"زبان"} fontStyle={"bold"} fontSize={11} marginTop={0} marginBottom={0} /></View>
              <View style={styles.itemWrapper}>
                {
                  resume.languageItem.map( ( languageItem: LanguageItem, i: number ) => {
                    return (
                      <View key={i} style={styles.item}>
                        <PersianText text={languageItem.languageName} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
                        <View style={styles.ratingStar}>
                          {
                            languageItem.level === 'زبان مادری' ?
                              <PersianText text={'زبان مادری'} fontStyle={"normal"} fontSize={9} marginTop={0} marginBottom={0} />
                              :
                              languageItem.level === 'مبتدی' ?
                                <Star color="gray" />
                                :
                                languageItem.level === 'پایین تر متوسط' ?
                                  <Fragment><Star color="gray" /><Star color="gray" /></Fragment>
                                  :
                                  languageItem.level === 'متوسط' ?
                                    <Fragment><Star color="gray" /><Star color="gray" /><Star color="gray" /></Fragment>
                                    :
                                    languageItem.level === 'بالا تر از متوسط' ?
                                      <Fragment><Star color="gray" /><Star color="gray" /><Star color="gray" /><Star color="gray" /></Fragment>
                                      :
                                      languageItem.level === 'پیشرفته' ?
                                        <Fragment><Star color="gray" /><Star color="gray" /><Star color="gray" /><Star color="gray" /><Star color="gray" /></Fragment>
                                        :
                                        <Fragment></Fragment>
                          }
                        </View>
                      </View>
                    )
                  } )
                }
              </View>
            </View>
          </View>}
        {resume.skillItem.length !== 0 &&
          <View style={styles.sectionViewWrapper} wrap={false}>
            <View style={styles.bioSectionView}>
              <View style={styles.title}><PersianText text={"مهارت ها"} fontStyle={"bold"} fontSize={11} marginTop={0} marginBottom={0} /></View>
              <View style={styles.itemWrapper}>
                {
                  resume.skillItem.map( ( skillItem: SkillItem, i: number ) => {
                    return (
                      <View key={i} style={styles.item}>
                        <PersianText text={skillItem.skillName} fontStyle={"normal"} fontSize={12} marginTop={0} marginBottom={0} />
                        <View style={styles.ratingStar}>
                          {
                            skillItem.level === 'درحال یادگیری' ?
                              <Star color="gray" />
                              :
                              skillItem.level === 'کم تجربه' ?
                                <Fragment><Star color="gray" /><Star color="gray" /></Fragment>
                                :
                                skillItem.level === 'تسلط نسبی' ?
                                  <Fragment><Star color="gray" /><Star color="gray" /><Star color="gray" /></Fragment>
                                  :
                                  skillItem.level === 'تسلط کامل' ?
                                    <Fragment><Star color="gray" /><Star color="gray" /><Star color="gray" /><Star color="gray" /></Fragment>
                                    :
                                    skillItem.level === 'حرفه ای' ?
                                      <Fragment><Star color="gray" /><Star color="gray" /><Star color="gray" /><Star color="gray" /><Star color="gray" /></Fragment>
                                      :
                                      <Fragment></Fragment>
                          }
                        </View>
                      </View>
                    )
                  } )
                }
              </View>
            </View>
          </View>
        }
        {resume.socialMediaItem.length !== 0 &&
          <View style={styles.sectionViewWrapper} wrap={false}>
            <View style={styles.bioSectionView}>
              <View style={styles.title}><PersianText text={"شبکه های اجتماعی"} fontStyle={"bold"} fontSize={11} marginTop={0} marginBottom={0} /></View>
              <View style={styles.itemWrapper}>
                {
                  resume.socialMediaItem.map( ( socialMediaItem: SocialMediaItem, i: number ) => {
                    return (
                      <View key={i} style={styles.socialMediaItem}>
                        <Link src={socialMediaItem.link} style={styles.link}>
                          <PersianText text={socialMediaItem.title} fontStyle={"normal"} fontSize={11} marginTop={2} marginBottom={4} />
                        </Link>
                      </View>
                    )
                  } )
                }
              </View>
            </View>
          </View>
        }
        {resume.projectItem.length !== 0 &&
          resume.projectItem.map( ( projectItem: ProjectItem, i: number ) => {
            return (
              <View key={i} wrap={false}>
                {i === 0 &&
                  <View style={styles.sectionViewWrapper}>
                    <PersianText text={"پروژه ها"} fontStyle={"bold"} fontSize={11} marginTop={0} marginBottom={0} />
                  </View>}
                <View style={styles.sectionView}>
                  <View style={styles.title}>
                    <PersianText text={`${projectItem.startDate}${projectItem.startDate && projectItem.endDate && ' - '}${projectItem.endDate}`} fontStyle={"ultralight"} fontSize={8} marginTop={6} marginBottom={0} />
                  </View>
                  <View style={styles.description}>
                    <PersianText text={`${projectItem.title}${projectItem.title && projectItem.employer && ' - '}${projectItem.employer}`} fontStyle={"normal"} fontSize={11} marginTop={0} marginBottom={0} />
                    {projectItem.description && projectItem.description !== '' &&
                      <Fragment>
                        <PersianText text={'توضیحات:'} fontStyle={"light"} fontSize={10} marginTop={4} marginBottom={0} />
                        {projectItem.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"light"} fontSize={10} marginTop={1} marginBottom={0} /> )}
                      </Fragment>
                    }
                    {projectItem.link && projectItem.link !== '' &&
                      <Fragment>
                        <PersianText text={`لینک پروژه:`} fontStyle={"normal"} fontSize={10} marginTop={4} marginBottom={0} />
                        <Link style={styles.projectLink} src={projectItem.link}>
                          <Text>{projectItem.link}</Text>
                        </Link>
                      </Fragment>
                    }
                  </View>
                </View>
              </View>
            )
          } )
        }
      </Page>
    </Document>
  )
};

export default memo( PDFTemplate1 );
